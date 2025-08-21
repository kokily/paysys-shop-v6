import { Body, Controller, Delete, Param, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SignService } from './sign.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { AdminGuard } from '../auth/admin.guard';
import { AddSignDto } from './dto/add-sign.dto';
import { RemoveSignDto } from './dto/remove-sign.dto';

@ApiTags('Sign')
@Controller('sign')
export class SignController {
  constructor(private readonly signService: SignService) {}

  @Post()
  @UseGuards(JwtAuthGuard, AdminGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: '서명 추가' })
  @ApiResponse({ status: 200, description: '서명 추가 성공' })
  async addSign(@Body() addSignDto: AddSignDto) {
    return this.signService.addSign(addSignDto);
  }

  @Delete(':weddingId/:sex')
  @UseGuards(JwtAuthGuard, AdminGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: '서명 삭제' })
  @ApiResponse({ status: 201, description: '서명 삭제 성공' })
  async removeSign(@Param('weddingId') weddingId: string, @Param('sex') sex: string) {
    const removeSignDto: RemoveSignDto = { weddingId, sex };
    return this.signService.removeSign(removeSignDto);
  }
}
