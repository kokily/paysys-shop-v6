import type { AuthenticatedRequest } from 'src/types/jwt.types';
import { Body, Controller, Delete, Get, Param, Patch, Post, Request, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { WeddingsService } from './weddings.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { AdminGuard } from '../auth/admin.guard';
import { AddWeddingDto } from './dto/add-wedding.dto';
import { ListWeddingsDto } from './dto/list-weddings.dto';
import { UpdateWeddingDto } from './dto/update-wedding.dto';

@ApiTags('Weddings')
@Controller('weddings')
export class WeddingsController {
  constructor(private readonly weddingsService: WeddingsService) {}

  @Post()
  @UseGuards(JwtAuthGuard, AdminGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: '웨딩 전표 전송(관리자)' })
  @ApiResponse({ status: 200, description: '웨딩 전표 전송 성공' })
  async addWedding(@Body() addWeddingDto: AddWeddingDto, @Request() _req: AuthenticatedRequest) {
    return this.weddingsService.addWedding(addWeddingDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard, AdminGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: '웨딩 전표 리스트 조회(관리자)' })
  @ApiResponse({ status: 200, description: '웨딩 전표 리스트 조회 성공' })
  @ApiResponse({ status: 404, description: 'Cursor ID 전표를 찾을 수 없음' })
  async listWeddings(@Param() listWeddingsDto: ListWeddingsDto, @Request() _req: AuthenticatedRequest) {
    return this.weddingsService.listWeddings(listWeddingsDto);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard, AdminGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: '웨딩 전표 상세조회(관리자)' })
  @ApiResponse({ status: 200, description: '웨딩 전표 상세 조회 성공' })
  @ApiResponse({ status: 404, description: '웨딩 전표를 찾을 수 없음' })
  async readWedding(@Param('id') id: string, @Request() _req: AuthenticatedRequest) {
    return this.weddingsService.readWedding(id);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, AdminGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: '웨딩 전표 삭제(관리자)' })
  @ApiResponse({ status: 201, description: '웨딩 전표 삭제 성공' })
  @ApiResponse({ status: 404, description: '웨딩 전표를 찾을 수 없음' })
  async removeWedding(@Param('id') id: string, @Request() _req: AuthenticatedRequest) {
    return this.weddingsService.removeWedding(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, AdminGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: '웨딩 전표 수정(관리자)' })
  @ApiResponse({ status: 201, description: '웨딩 전표 수정 성공' })
  @ApiResponse({ status: 404, description: '웨딩 전표를 찾을 수 없음' })
  async updateWedding(
    @Param('id') id: string,
    @Body() updateWeddingDto: UpdateWeddingDto,
    @Request() _req: AuthenticatedRequest
  ) {
    return this.weddingsService.updateWedding(id, updateWeddingDto);
  }
}
