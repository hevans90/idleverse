import { DataSource } from 'apollo-datasource';
import { isObject } from 'lodash';
import * as minio from 'minio';

const toCamel = (s: string) =>
  s.replace(/([-_][a-z])/gi, ($1) =>
    $1.toUpperCase().replace('-', '').replace('_', '')
  );

const keysToCamel = (object: object) => {
  if (isObject(object)) {
    const n = {};

    Object.keys(object).forEach((k) => {
      n[toCamel(k)] = keysToCamel(object[k]);
    });

    return n;
  }

  return object;
};

export class MinioAPI extends DataSource {
  constructor(client: minio.Client) {
    super();
    this.client = client;
  }

  client: minio.Client;
  baseUrl: string;

  async augmentBucketItemsWithMetaData(
    bucketName: string,
    items: minio.BucketItem[]
  ) {
    const itemsWithMetadata: minio.BucketItemWithMetadata[] = [];
    for (const item of items) {
      const { metaData: metadata } = await this.client.statObject(
        bucketName,
        item.name
      );
      itemsWithMetadata.push({ ...item, metadata: keysToCamel(metadata) });
    }
    return itemsWithMetadata;
  }

  async getBucketItems(bucketName: 'music' | 'backgrounds') {
    return new Promise<minio.BucketItemWithMetadata[]>((res, rej) => {
      const data: minio.BucketItemWithMetadata[] = [];

      const music = this.client.listObjects(bucketName);

      music.on('data', async (obj) => {
        data.push(obj);
      });
      music.on('error', (err) => {
        console.error(err);
        rej(err);
      });
      music.on('end', async () => {
        const itemsWithMetaData = await this.augmentBucketItemsWithMetaData(
          bucketName,
          data
        );
        console.log(itemsWithMetaData);
        res(itemsWithMetaData);
      });
    });
  }
}
