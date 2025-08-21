import type { AuthenticatedRequest } from 'src/types/jwt.types';
import { Body, Controller, Delete, Get, Param, Patch, Post, Request, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { AddBillDto } from './dto/add-bill.dto';
import { BillsService } from './bills.service';
import { ListBillsDto } from './dto/list-bills.dto';

export const CART_404_MESSAGE = '현 사용자의 카트가 비어있습니다.';
export const BILL_404_MESSAGE = '존재하지 않는 빌지입니다.';
export const FORBIDDEN_403_MESSAGE = '권한이 없습니다.';

@ApiTags('Bills')
@Controller('bills')
export class BillsController {
  constructor(private billsService: BillsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: '전표 전송' })
  @ApiResponse({ status: 200, description: '전표 전송 성공' })
  @ApiResponse({ status: 404, description: CART_404_MESSAGE })
  async addBill(@Body() addBillDto: AddBillDto, @Request() req: AuthenticatedRequest) {
    return this.billsService.addBill(req.user.user_id, req.user.username, addBillDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: '전표 리스트 조회' })
  @ApiResponse({ status: 200, description: '전표 리스트 조회 성공' })
  @ApiResponse({ status: 404, description: '커서 전표를 찾을 수 업습니다.' })
  async findAll(@Param() listBillsDto: ListBillsDto, @Request() _req: AuthenticatedRequest) {
    return this.billsService.findAll(listBillsDto);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: '전표 상세 조회' })
  @ApiResponse({ status: 200, description: '전표 상세 조회 성공' })
  @ApiResponse({ status: 404, description: BILL_404_MESSAGE })
  async findOne(@Param('id') id: string, @Request() _req: AuthenticatedRequest) {
    return this.billsService.findOne(id);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: '전표 삭제' })
  @ApiResponse({ status: 201, description: '전표 삭제 성공' })
  @ApiResponse({ status: 404, description: BILL_404_MESSAGE })
  @ApiResponse({ status: 403, description: FORBIDDEN_403_MESSAGE })
  async remove(@Param('id') id: string, @Request() req: AuthenticatedRequest) {
    return this.billsService.remove(id, req.user.user_id, req.user.admin);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: '전표 카트 복원' })
  @ApiResponse({ status: 200, description: '전표 복원 성공' })
  async restore(@Param('id') id: string, @Request() req: AuthenticatedRequest) {
    return this.billsService.restore(id, req.user.user_id);
  }
}
