import { DataSource } from 'apollo-datasource';
import * as minio from 'minio';

export class MinioAPI extends DataSource {
  constructor(client: minio.Client) {
    super();
    this.client = client;
  }

  client: minio.Client;
  baseUrl: string;

  async getMusic() {
    return new Promise<minio.BucketItem[]>((res, rej) => {
      const data: minio.BucketItem[] = [];
      const music = this.client.listObjects('music');

      music.on('data', (obj) => data.push(obj));
      music.on('error', (err) => {
        console.error(err);
        rej(err);
      });
      music.on('end', () => res(data));
    });
  }
}
