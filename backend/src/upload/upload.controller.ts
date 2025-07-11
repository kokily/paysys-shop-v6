import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  Res,
  HttpStatus,
  UseGuards,
  Req,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags, ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import { Response, Request } from 'express';
import * as multer from 'multer';
import { uploadImageToS3 } from '../utils/s3upload';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import type { File as MulterFile } from 'multer';

@ApiTags('upload')
@Controller('upload')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class UploadController {
  @Post()
  @UseInterceptors(FileInterceptor('file', { storage: multer.memoryStorage() }))
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  async uploadImage(
    @UploadedFile() file: MulterFile,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    try {
      const isAdmin = (req as any).user?.admin;
      if (!isAdmin) {
        return res.status(HttpStatus.FORBIDDEN).send('관리자만 접근 가능합니다');
      }
      if (!file) {
        return res.status(HttpStatus.BAD_REQUEST).send('파일이 필요합니다');
      }
      const { key, url } = await uploadImageToS3(file);
      return res.status(HttpStatus.OK).json({ key, url });
    } catch (err: any) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send('서버 오류');
    }
  }
} 