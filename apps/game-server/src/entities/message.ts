import { ArrayMaxSize, Length, Max, MaxLength, Min } from 'class-validator';
import 'reflect-metadata';
import {
  ArgsType,
  Field,
  ID,
  InputType,
  Int,
  ObjectType,
  Query,
  Resolver,
} from 'type-graphql';
import { Service } from 'typedi';

@Service()
export class RecipeService {
  private readonly items: Recipe[] = [];

  async getAll() {
    return this.items;
  }

  async getOne(id: string) {
    return this.items.find((item) => item.id === id);
  }
}

@InputType()
class NewRecipeInput {
  @Field()
  @MaxLength(30)
  title: string;

  @Field({ nullable: true })
  @Length(30, 255)
  description?: string;

  @Field((type) => [String])
  @ArrayMaxSize(30)
  ingredients: string[];
}

@ArgsType()
class RecipesArgs {
  @Field((type) => Int)
  @Min(0)
  skip = 0;

  @Field((type) => Int)
  @Min(1)
  @Max(50)
  take = 25;
}

@ObjectType()
class Recipe {
  @Field((type) => ID)
  id: string;

  @Field()
  title: string;

  @Field({ nullable: true })
  description?: string;

  @Field()
  creationDate: Date;

  @Field((type) => [String])
  ingredients: string[];
}

class User {}

@Service()
@Resolver((of) => Recipe)
export class RecipeResolver {
  constructor(
    // constructor injection of a service
    private readonly recipeService: RecipeService
  ) {}

  @Query((returns) => Recipe, { nullable: true })
  async recipes() {
    // usage of the injected service
    return this.recipeService.getAll();
  }
}
