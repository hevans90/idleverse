import { readdir } from 'fs/promises';
import { BucketItem, Client } from 'minio';

const publicPolicy = JSON.stringify({
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
      Resource: ['arn:aws:s3:::music'],
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
      Resource: ['arn:aws:s3:::music/*'],
    },
  ],
});

const tracksToUpload = await readdir(__dirname + '/music');

console.log('music to add', tracksToUpload);

const client = new Client({
  endPoint: 'localhost' as string,
  port: 9000,
  useSSL: false,
  accessKey: process.env.MINIO_ACCESS_KEY as string,
  secretKey: process.env.MINIO_SECRET_KEY as string,
});

const makeMusicBucket = async () => {
  const bucketExists = await client.bucketExists('music');

  if (bucketExists) {
    console.log('\nmusic bucket already exists');
  } else {
    await client.makeBucket('music');
    console.log('\nmusic bucket created');
  }

  await client.setBucketPolicy('music', publicPolicy);
};
const getMusic = async () => {
  return new Promise<BucketItem[]>((res, rej) => {
    const data: BucketItem[] = [];
    const music = client.listObjects('music');

    music.on('data', (obj) => data.push(obj));
    music.on('error', (err) => {
      console.error(err);
      rej(err);
    });
    music.on('end', () => res(data));
  });
};

const uploadMusic = async () => {
  const promises = tracksToUpload.map((trackName) =>
    client.fPutObject('music', trackName, `${__dirname}/music/${trackName}`)
  );

  try {
    await Promise.all(promises);
    console.log('tracks uploaded successfully');
  } catch (e) {
    console.error('track upload failed', e);
  }
};

await makeMusicBucket();

await uploadMusic();

const music = await getMusic();
console.log('\nbucket content', music);
