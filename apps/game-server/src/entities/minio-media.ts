import 'reflect-metadata';
import { Arg, Ctx, Field, ObjectType, Query, Resolver } from 'type-graphql';
import { Context } from '../datasources/context';

import { type IdleverseMedia } from '@idleverse/models';
import { BucketItemWithMetadata, ItemBucketMetadataList } from 'minio';

@ObjectType()
export class MediaMetadata {
  @Field()
  contentType: string;
  @Field()
  duration: number;
}

@ObjectType()
export class MediaResult
  implements Pick<BucketItemWithMetadata, 'etag' | 'name' | 'metadata'>
{
  @Field()
  name: string;

  @Field()
  etag: string;

  @Field(() => MediaMetadata, { nullable: true })
  metadata?: ItemBucketMetadataList;
}

@Resolver((of) => MediaResult)
export class MinioMediaResolver {
  @Query((returns) => [MediaResult], { nullable: true })
  async media(
    @Ctx() context: Context,
    @Arg('mediaType', () => String) mediaType: IdleverseMedia
  ) {
    const data = await context.dataSources.minio.getBucketItems(mediaType);
    return data;
  }
}
