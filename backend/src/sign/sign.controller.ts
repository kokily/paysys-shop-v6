import {
  Controller,
  Post,
  Delete,
  Body,
  Param,
  Res,
  HttpStatus,
  UseGuards,
  Req,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiBody, ApiParam } from '@nestjs/swagger';
import { Response, Request } from 'express';
import { SignService } from './sign.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

class AddSignDto {
  weddingId: string;
  sex: 'husband' | 'bride';
  image: string;
}

@ApiTags('sign')
@Controller('sign')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class SignController {
  constructor(private readonly signService: SignService) {}

  /**
   * 웨딩 서명 이미지 등록 API
   *
   * @description
   * - weddingId, sex, image를 받아 해당 웨딩의 서명 이미지를 등록합니다
   * - 관리자만 접근 가능합니다
   *
   * @param body - { weddingId, sex, image }
   * @param req - Express Request 객체 (JWT 토큰에서 사용자 정보 추출)
   * @param res - Express Response 객체
   * @returns 성공 시 200
   */
  @Post()
  @ApiBody({ type: AddSignDto })
  async addSign(
    @Body() body: AddSignDto,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    try {
      const isAdmin = (req as any).user?.admin;
      if (!isAdmin) {
        return res.status(HttpStatus.FORBIDDEN).send('관리자만 접근 가능합니다');
      }
      await this.signService.addSign(body.weddingId, body.sex, body.image);
      return res.status(HttpStatus.OK).send();
    } catch (err: any) {
      if (err.message === '존재하지 않는 웨딩입니다.') {
        return res.status(HttpStatus.NOT_FOUND).send(err.message);
      }
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send('서버 오류');
    }
  }

  /**
   * 웨딩 서명 이미지 삭제 API
   *
   * @description
   * - weddingId로 해당 웨딩의 서명 이미지를 모두 삭제합니다
   * - 관리자만 접근 가능합니다
   *
   * @param id - 웨딩 ID
   * @param req - Express Request 객체 (JWT 토큰에서 사용자 정보 추출)
   * @param res - Express Response 객체
   * @returns 성공 시 200
   */
  @Delete(':id')
  @ApiParam({ name: 'id', description: '웨딩 ID' })
  async removeSign(
    @Param('id') id: string,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    try {
      const isAdmin = (req as any).user?.admin;
      if (!isAdmin) {
        return res.status(HttpStatus.FORBIDDEN).send('관리자만 접근 가능합니다');
      }
      await this.signService.removeSign(id);
      return res.status(HttpStatus.OK).send();
    } catch (err: any) {
      if (err.message === '존재하지 않는 웨딩입니다.') {
        return res.status(HttpStatus.NOT_FOUND).send(err.message);
      }
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send('서버 오류');
    }
  }
} 