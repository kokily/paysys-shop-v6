import { Body, Controller, Delete, Param, Post, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { AdminGuard } from "../auth/admin.guard";
import { AddSignDto, RemoveSignDto } from "./dto/sign.dto";
import { SignService } from "./sign.service";

@ApiTags('Sign')
@Controller('sign')
@UseGuards(JwtAuthGuard, AdminGuard)
@ApiBearerAuth('JWT-auth')
export class SignController {
  constructor(private readonly signService: SignService) {}

  /**
   * 서명 정보 생성
   * @param addSignDto 서명 생성 데이터
   * @returns 응답 성공
   */
  @Post()
  @ApiOperation({ summary: '서명 이미지 추가' })
  @ApiResponse({ status: 200, description: '서명 이미지 추가' })
  async addSign(@Body() addSignDto: AddSignDto) {
    return this.signService.addSign(addSignDto);
  }

  /**
   * 서명 정보 삭제
   * @param removeSignDto 서명 삭제 데이터
   * @returns 삭제 성공 응답
   */
  @Delete(':id')
  @ApiOperation({ summary: '서명 이미지 삭제' })
  @ApiResponse({ status: 200, description: '서명 이미지 삭제' })
  async removeSign(@Param() removeSignDto: RemoveSignDto) {
    return this.signService.removeSign(removeSignDto);
  }
}