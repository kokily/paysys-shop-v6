import { Controller, FileTypeValidator, MaxFileSizeValidator, ParseFilePipe, Post, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { FileInterceptor } from "@nestjs/platform-express";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { AdminGuard } from "../auth/admin.guard";
import { UploadResponseDto } from "./dto/upload-response.dto";
import { UploadsService } from "./uploads.service";

@ApiTags('Uploads')
@Controller('uploads')
export class UploadsController {
  constructor(private readonly uploadsService: UploadsService) {}

  /**
   * 이미지 파일 업로드 (관리자 전용)
   * - AWS s3에 이미지 파일 업로드
   * - 지원 형식: jpg, jpeg, png, gif, avif
   * - 파일명: YYMMDD_HHmmss_원본파일명 형식
   * @param file 업로드할 이미지 파일
   * @returns 업로드된 파일 정보 (key, url)
   */
  @Post()
  @UseGuards(JwtAuthGuard, AdminGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: '이미지 파일 업로드(관리자)' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
          description: '업로드할 이미지 파일',
        },
      },
    },
  })
  @ApiResponse({ status: 201, description: '파일 업로드 성공' })
  @ApiResponse({ status: 400, description: '잘못된 파일 형식' })
  @ApiResponse({ status: 403, description: '관리자 권한 필요' })
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          // 5MB
          new MaxFileSizeValidator({ maxSize: 5 * 1024 * 1024 }),
          new FileTypeValidator({ fileType: '.(jpg|jpeg|png|gif|avif)' }),
        ],
      }),
    )
    file: Express.Multer.File,
  ): Promise<UploadResponseDto> {
    return this.uploadsService.uploadFile(file);
  }
}