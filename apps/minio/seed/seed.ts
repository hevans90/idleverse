import { readdir } from 'fs/promises';
import { BucketItem, Client, ClientOptions } from 'minio';

const publicPolicyFactory = (bucketName: string) => ({
  Version: '2012-10-17',
  Statement: [
    {
      Effect: 'Allow',
      Principal: { AWS: ['*'] },
      Action: [
        's3:GetBucketLocation',
        's3:ListBucket',
        's3:ListBucketMultipartUploads',
      ],
      Resource: [`arn:aws:s3:::${bucketName}`],
    },
    {
      Effect: 'Allow',
      Principal: { AWS: ['*'] },
      Action: [
        's3:DeleteObject',
        's3:GetObject',
        's3:ListMultipartUploadParts',
        's3:PutObject',
        's3:AbortMultipartUpload',
      ],
      Resource: [`arn:aws:s3:::${bucketName}/*`],
    },
  ],
});

const tracksToUpload = await readdir(__dirname + '/music');
const backgroundAudioToUpload = await readdir(__dirname + '/backgrounds');

console.log('music to add', tracksToUpload);
console.log('background audio to add', backgroundAudioToUpload);

const localRun = (process.env.MINIO_URL as string).includes('localhost');

let clientConfig: ClientOptions = {
  endPoint: process.env.MINIO_URL as string,
  useSSL: !localRun,
  accessKey: process.env.MINIO_ACCESS_KEY as string,
  secretKey: process.env.MINIO_SECRET_KEY as string,
};

if (localRun) {
  clientConfig = { ...clientConfig, port: 9000 };
}

const client = new Client(clientConfig);

const buckets = ['music', 'backgrounds'];
const makeBuckets = async () => {
  for (let i = 0; i < buckets.length; i++) {
    const bucketExists = await client.bucketExists(buckets[i]);
    if (bucketExists) {
      console.log(`\n${buckets[i]} bucket already exists`);
    } else {
      await client.makeBucket(buckets[i]);
      console.log(`\n${buckets[i]} bucket created`);
    }
    await client.setBucketPolicy(
      buckets[i],
      JSON.stringify(publicPolicyFactory(buckets[i]))
    );
    console.log(`\n${buckets[i]} bucket policy added`);
  }
};
const getBucketContent = async (bucketName: string) => {
  return new Promise<BucketItem[]>((res, rej) => {
    const data: BucketItem[] = [];
    const music = client.listObjects(bucketName);

    music.on('data', (obj) => data.push(obj));
    music.on('error', (err) => {
      console.error(err);
      rej(err);
    });
    music.on('end', () => res(data));
  });
};

const uploadAudio = async () => {
  for (let i = 0; i < buckets.length; i++) {
    const tracksToUpload = await readdir(`${__dirname}/${buckets[i]}`);

    const promises = tracksToUpload.map((trackName) =>
      client.fPutObject(
        buckets[i],
        trackName,
        `${__dirname}/${buckets[i]}/${trackName}`
      )
    );

    try {
      await Promise.all(promises);
      console.log(
        `\n${promises.length} track${
          promises.length > 1 ? 's' : ''
        } uploaded successfully to bucket: ${buckets[i]}`
      );
    } catch (e) {
      console.error('\ntrack upload failed', e);
    }
  }
};

await makeBuckets();

await uploadAudio();
