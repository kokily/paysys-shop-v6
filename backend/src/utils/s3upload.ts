import * as AWS from 'aws-sdk';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';
import type { File as MulterFile } from 'multer';

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION || 'ap-northeast-2',
});

const BUCKET_NAME = 'image.paysys.kr';

export async function uploadImageToS3(file: MulterFile): Promise<{ key: string; url: string }> {
  const ext = path.extname(file.originalname);
  const key = `uploads/${uuidv4()}${ext}`;

  const params = {
    Bucket: BUCKET_NAME,
    Key: key,
    Body: file.buffer,
    ContentType: file.mimetype,
    ACL: 'public-read',
  };

  await s3.upload(params).promise();

  return {
    key,
    url: `https://${BUCKET_NAME}.s3.amazonaws.com/${key}`,
  };
} 