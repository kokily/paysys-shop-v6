import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class RemoveCartItemDto {
  @ApiProperty({ description: '카트 아이템 ID', example: '123e4567-e89b-12d3-a456-426614174000' })
  @IsString()
  id: string;
}