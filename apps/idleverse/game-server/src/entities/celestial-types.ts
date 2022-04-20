import {
  Planet,
  Planetary_Ring_Arr_Rel_Insert_Input,
  Planet_Insert_Input,
  Terrain_Hex_Palette_Obj_Rel_Insert_Input,
} from '@idleverse/galaxy-gql';
import { GraphQLJSONObject } from 'graphql-type-json';
import { Field, InputType, ObjectType } from 'type-graphql';

@InputType()
export class TerrainPaletteInput
  implements Terrain_Hex_Palette_Obj_Rel_Insert_Input
{
  @Field(() => GraphQLJSONObject)
  data: object;
}

@InputType()
export class RingInsertInput implements Planetary_Ring_Arr_Rel_Insert_Input {
  @Field(() => [GraphQLJSONObject])
  data: [object];
}

@InputType()
export class PlanetCreationInput implements Planet_Insert_Input {
  @Field()
  celestial_id: string;

  @Field()
  id: string;

  @Field()
  name: string;

  @Field()
  owner_id: string;

  @Field()
  radius: number;

  @Field()
  rings?: RingInsertInput;

  @Field()
  terrain_bias: number;

  @Field()
  terrain_hex_palette: TerrainPaletteInput;

  @Field()
  terrain_hex_palette_id: string;

  @Field()
  texture_resolution: number;
}

@ObjectType()
export class PartialPlanet implements Pick<Planet, 'id' | 'name' | 'owner_id'> {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field()
  owner_id: string;
}

@ObjectType()
export class CelestialManagement {
  @Field()
  createdPlanet: PartialPlanet;
}
