import type { AuthenticatedRequest } from 'src/types/jwt.types';
import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Request, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ItemsService } from './items.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { AdminGuard } from '../auth/admin.guard';
import { AddItemDto } from './dto/add-item.dto';
import { ListItemsDto } from './dto/list-items.dto';
import { UpdateItemDto } from './dto/update-item.dto';

@ApiTags('Items')
@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Post()
  @UseGuards(JwtAuthGuard, AdminGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: '품목 추가(관리자)' })
  @ApiResponse({ status: 200, description: '품목 추가 성공' })
  async addItem(@Body() addItemDto: AddItemDto, @Request() _req: AuthenticatedRequest) {
    return this.itemsService.addItem(addItemDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: '품목 리스트' })
  @ApiResponse({ status: 200, description: '품목 리스트 조회 성공' })
  async findAll(@Query() listItemsDto: ListItemsDto, @Request() _req: AuthenticatedRequest) {
    return this.itemsService.findAll(listItemsDto);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: '품목 상세보기' })
  @ApiResponse({ status: 200, description: '품목 상세보기 조회 성공' })
  @ApiResponse({ status: 404, description: '품목을 찾지 못했습니다.' })
  async findOne(@Param('id') id: string, @Request() _req: AuthenticatedRequest) {
    return this.itemsService.findOne(id);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, AdminGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: '품목 삭제(관리자)' })
  @ApiResponse({ status: 200, description: '품목 삭제 성공' })
  @ApiResponse({ status: 404, description: '품목을 찾지 못했습니다.' })
  async remove(@Param('id') id: string, @Request() _req: AuthenticatedRequest) {
    return this.itemsService.remove(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, AdminGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: '품목 수정(관리자)' })
  @ApiResponse({ status: 200, description: '품목 업데이트 성공' })
  @ApiResponse({ status: 404, description: '품목을 찾지 못했습니다.' })
  async update(@Param('id') id: string, @Body() updateItemDto: UpdateItemDto) {
    return this.itemsService.update(id, updateItemDto);
  }
}
