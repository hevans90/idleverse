import {
  ApolloClient,
  FetchResult,
  NormalizedCacheObject,
} from '@apollo/client';

import {
  EmpireResourceGeneratorsDocument,
  EmpireResourceGeneratorsSubscription,
  IncrementGalacticEmpireResourcesDocument,
  IncrementGalacticEmpireResourcesMutation,
  IncrementGalacticEmpireResourcesMutationVariables,
} from '@idleverse/galaxy-gql';

type ResourceType =
  | 'galactic credits'
  | 'common metals'
  | 'rare metals'
  | 'hydrocarbons'
  | 'void matter';

type GalacticResourceGenerationRate = {
  galacticEmpireId: string;
  galacticCreditsIncrement: number;
  commonMetalsIncrement: number;
  rareMetalsIncrement: number;
  hydrocarbonsIncrement: number;
  voidMatterIncrement: number;
};

export const generationRate = 1000;

export const generateResources = (
  client: ApolloClient<NormalizedCacheObject>
) => {
  console.log(
    `Beginning resource generation at 1 tick every ${
      generationRate / 1000
    } seconds.`
  );

  let galacticEmpireIdsInPlay: string[] = [];
  let generationRates: GalacticResourceGenerationRate[] = [];

  client
    .subscribe<EmpireResourceGeneratorsSubscription>({
      query: EmpireResourceGeneratorsDocument,
    })
    .subscribe({
      next: ({
        data: { galactic_empire_resource_generator: resourceGenerators },
      }) => {
        const newGenerationRates: GalacticResourceGenerationRate[] = [];

        galacticEmpireIdsInPlay = [
          // create a list of unique galactic_empire_ids
          ...new Set(
            resourceGenerators.map(
              ({ galactic_empire_id }) => galactic_empire_id
            )
          ),
        ];

        // loop through each empire and create a new generation rate object for each one in play
        galacticEmpireIdsInPlay.forEach((galacticEmpireId) => {
          let galacticCreditsIncrement = 0;
          let commonMetalsIncrement = 0;
          let rareMetalsIncrement = 0;
          let hydrocarbonsIncrement = 0;
          let voidMatterIncrement = 0;

          const incrementRate = (resourceType: ResourceType, rate: number) => {
            switch (resourceType) {
              case 'galactic credits':
                galacticCreditsIncrement += rate;
                break;
              case 'common metals':
                commonMetalsIncrement += rate;
                break;
              case 'rare metals':
                rareMetalsIncrement += rate;
                break;
              case 'hydrocarbons':
                hydrocarbonsIncrement += rate;
                break;
              case 'void matter':
                voidMatterIncrement += rate;
                break;

              default:
                break;
            }
          };

          const generatorsByEmpireId = resourceGenerators.filter(
            ({ galactic_empire_id }) => galactic_empire_id === galacticEmpireId
          );

          generatorsByEmpireId.forEach((generator) => {
            if (generator.resource_generator?.resource_type_2) {
              // this generator generates 2 resource types
              const [rate1, rate2] =
                generator.resource_generator.generation_rate;
              incrementRate(
                generator.resource_generator.resource_type.type as ResourceType,
                rate1 * generator.count
              );
              incrementRate(
                generator.resource_generator.resource_type_2
                  .type as ResourceType,
                rate2 * generator.count
              );
            } else {
              // this generator generates 1 resource type
              const [rate] = generator.resource_generator.generation_rate;

              incrementRate(
                generator.resource_generator.resource_type.type as ResourceType,
                rate * generator.count
              );
            }
          });

          newGenerationRates.push({
            galacticEmpireId,
            galacticCreditsIncrement,
            commonMetalsIncrement,
            rareMetalsIncrement,
            hydrocarbonsIncrement,
            voidMatterIncrement,
          });
        });

        generationRates = newGenerationRates;
      },
    });

  setInterval(() => {
    const promises: Promise<
      FetchResult<IncrementGalacticEmpireResourcesMutation>
    >[] = [];

    generationRates.forEach(
      ({
        galacticEmpireId,
        galacticCreditsIncrement,
        commonMetalsIncrement,
        rareMetalsIncrement,
        hydrocarbonsIncrement,
        voidMatterIncrement,
      }) =>
        promises.push(
          client.mutate<
            IncrementGalacticEmpireResourcesMutation,
            IncrementGalacticEmpireResourcesMutationVariables
          >({
            mutation: IncrementGalacticEmpireResourcesDocument,
            variables: {
              galacticEmpireId,
              galacticCreditsIncrement,
              commonMetalsIncrement,
              hydrocarbonsIncrement,
              rareMetalsIncrement,
              voidMatterIncrement,
            },
          })
        )
    );

    Promise.all(promises).then((results) => {
      results.length &&
        console.log(
          `Resources generated for ${
            results.length
          } empires at ${new Date().toLocaleTimeString()}`
        );
    });
  }, generationRate);
};
