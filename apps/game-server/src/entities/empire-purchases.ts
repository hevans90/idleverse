import { generatorCost } from '@idleverse/resource-gen';
import 'reflect-metadata';
import {
  Arg,
  Authorized,
  Ctx,
  Field,
  Mutation,
  ObjectType,
  Resolver,
} from 'type-graphql';
import { Context } from '../datasources/context';
import { resourceModificationFactory } from '../resource-modification/utils';
import {
  emptyResourceModification,
  validateResourceModification,
} from '../resource-modification/validate-resource-modification';
import { UserErrorTypes } from './error-enums/user-errors';

@ObjectType()
export class EmpirePurchases {
  @Field()
  purchase: string;
}

@ObjectType()
export class PurchaseCompletion {
  @Field()
  spent: number;
}

@Resolver((of) => EmpirePurchases)
export class EmpirePurchasesResolver {
  @Authorized('user')
  @Mutation((returns) => PurchaseCompletion, { nullable: true })
  async purchaseResourceGenerator(
    @Ctx() { dataSources, id: userId }: Context,
    @Arg('galactic_empire_id') galacticEmpireId: string,
    @Arg('generator_type_id') generatorTypeId: string
  ) {
    if (!userId) throw new Error(UserErrorTypes.NoUserId);

    const { data: empireResources } =
      await dataSources.hasuraEmpirePurchases.getEmpireResources({
        galacticEmpireId,
      });

    const { data: availableResourceGeneratorsData } =
      await dataSources.hasuraEmpirePurchases.getResourceGenerators();

    const generatorToPurchase =
      availableResourceGeneratorsData.resource_generator.find(
        ({ id }) => id === generatorTypeId
      );

    const { data: empireResourceGeneratorsData } =
      await dataSources.hasuraEmpirePurchases.getEmpireResourceGenerators({
        galacticEmpireId,
        generatorTypeId,
      });

    // validate the empire has enough resources (or even has the resources unlocked) to make the purchase
    let resourceModification = emptyResourceModification(galacticEmpireId);

    const resourceValidation = validateResourceModification({
      resources: empireResources.galactic_empire_resources,
      resource_amount: -generatorToPurchase.cost_amount_1,
      resource_id: generatorToPurchase.cost_resource_type_id_1,
    });

    if (resourceValidation.error) {
      throw new Error(resourceValidation.error);
    }

    // now work out whether to create a new row or increment an existing generator row
    const generatorExistsInEmpire =
      empireResourceGeneratorsData.galactic_empire_resource_generator.find(
        ({ resource_generator }) => resource_generator.id === generatorTypeId
      );

    const count = generatorExistsInEmpire?.count ?? 0;

    const cost = generatorCost({
      baseCost: generatorToPurchase.cost_amount_1,
      costGrowthExponent: generatorToPurchase.cost_growth_exponent,
      owned: count,
    });

    resourceModification = resourceModificationFactory(
      resourceModification,
      resourceValidation.modifierKey,
      -cost
    );

    // spend the resources to buy the generator
    await dataSources.hasuraEmpireResourceModifiers.incrementEmpireResources(
      resourceModification
    );

    if (generatorExistsInEmpire) {
      // increment the existing row count by 1
      await dataSources.hasuraEmpirePurchases.incrementResourceGenerator({
        galacticEmpireId,
        generatorTypeId,
        increment: 1,
      });
    } else {
      // create a new row with count 1 (i.e. your first generator of a given type)
      await dataSources.hasuraEmpirePurchases.createNewResourceGenerator({
        galacticEmpireId,
        generatorTypeId,
      });
    }
  }
}
