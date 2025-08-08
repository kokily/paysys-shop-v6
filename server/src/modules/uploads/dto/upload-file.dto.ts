import { ApiProperty } from "@nestjs/swagger";

export class UploadFileDto {
  @ApiProperty({
    type: 'string',
    format: 'binary',
    description: '업로드할 이미지 파일'
  })
  file: Express.Multer.File;
}