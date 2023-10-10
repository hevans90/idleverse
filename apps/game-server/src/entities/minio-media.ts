import 'reflect-metadata';
import { Ctx, Field, ObjectType, Query, Resolver } from 'type-graphql';
import { Context } from '../datasources/context';

import {
  BucketItemWithMetadata,
  ItemBucketMetadataList,
  MetadataItem,
} from 'minio';

@ObjectType()
export class MediaMetadata implements MetadataItem {
  @Field()
  Key: string;
  @Field()
  Value: string;
}

@ObjectType()
export class MediaResult
  implements Pick<BucketItemWithMetadata, 'etag' | 'name' | 'metadata'>
{
  @Field()
  name: string;

  @Field()
  etag: string;

  @Field(() => [MediaMetadata], { nullable: true })
  metadata?: ItemBucketMetadataList;
}

@Resolver((of) => MediaResult)
export class MinioMediaResolver {
  @Query((returns) => [MediaResult], { nullable: true })
  async music(@Ctx() context: Context) {
    const data = await context.dataSources.minio.getMusic();
    return data;
  }
}
