import { BadRequestException, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import * as AWS from 'aws-sdk';
import moment from 'moment';

export interface S3UploadResult {
  key: string;
  url: string;
}

@Injectable()
export class UploadsService {
  private s3: AWS.S3;

  constructor(private configService: ConfigService) {
    AWS.config.update({
      region: 'ap-northeast-2',
      accessKeyId: this.configService.get('AWS_ACCESS_KEY_ID'),
      secretAccessKey: this.configService.get('AWS_SECRET_ACCESS_KEY'),
    });

    this.s3 = new AWS.S3({
      apiVersion: '2006-03-01',
    });
  }
  
  async uploadFile(file: Express.Multer.File): Promise<S3UploadResult> {
    if (!file) {
      throw new BadRequestException('업로드할 파일이 없습니다.');
    }

    // 파일 확장자 검증
    const allowedMimeTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/avif'];

    if (!allowedMimeTypes.includes(file.mimetype)) {
      throw new BadRequestException('지원하지 않는 파일 형식입니다.');
    }

    // 파일명 생성 특수문자 제거
    const timestamp = moment().format('YYMMDD_HHmmss');
    const originalName = file.originalname.replace(/[^a-zA-Z0-9.-]/g, '_');
    const key = `${timestamp}_${originalName}`;

    // S3 업로드 파라미터, 공개 읽기 권한
    const uploadParams: AWS.S3.PutObjectRequest = {
      Bucket: 'image.paysys.kr',
      Key: key,
      Body: file.buffer,
      ContentType: file.mimetype,
      ACL: 'public-read',
    };

    try {
      // S3 파일 업로드
      const result = await this.s3.upload(uploadParams).promise();

      return {
        key: result.Key,
        url: result.Location,
      };
    } catch (error) {
      console.error('S3 업로드 에러: ', error);
      throw new BadRequestException('파일 업로드에 실패했습니다.');
    }
  }

  async deleteFile(key: string): Promise<boolean> {
    try {
      await this.s3.deleteObject({
        Bucket: 'image.paysys.kr',
        Key: key,
      }).promise();

      return true;
    } catch (error) {
      console.error('S3 삭제 에러: ', error);
      return false;
    }
  }
}