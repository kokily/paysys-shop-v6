import { ApiProperty } from "@nestjs/swagger";

export class UploadResponseDto {
  @ApiProperty({
    description: 'S3 파일 키',
    example: '240108_143022_example.jpg',
  })
  key: string;

  @ApiProperty({
    description: 'S3 파일 URL',
    example: 'https://image.paysys.kr/240108_143022_example.jpg',
  })
  url: string;
}