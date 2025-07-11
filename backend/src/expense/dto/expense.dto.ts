import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class ExpenseDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  husband_name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  bride_name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  wedding_at: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  event_at: string;

  @ApiProperty()
  @IsNumber()
  company_husband: number;
  @ApiProperty()
  @IsNumber()
  company_bride: number;
  @ApiProperty()
  @IsNumber()
  rooftop_husband: number;
  @ApiProperty()
  @IsNumber()
  rooftop_bride: number;
  @ApiProperty()
  @IsNumber()
  owner_woman_husband: number;
  @ApiProperty()
  @IsNumber()
  owner_woman_bride: number;
  @ApiProperty()
  @IsNumber()
  owner_man_husband: number;
  @ApiProperty()
  @IsNumber()
  owner_man_bride: number;
  @ApiProperty()
  @IsNumber()
  select_husband: number;
  @ApiProperty()
  @IsNumber()
  select_bride: number;
  @ApiProperty()
  @IsNumber()
  frame_husband: number;
  @ApiProperty()
  @IsNumber()
  frame_bride: number;
  @ApiProperty()
  @IsNumber()
  dress_husband: number;
  @ApiProperty()
  @IsNumber()
  dress_bride: number;
  @ApiProperty()
  @IsNumber()
  hairpin_husband: number;
  @ApiProperty()
  @IsNumber()
  hairpin_bride: number;
  @ApiProperty()
  @IsNumber()
  wig_husband: number;
  @ApiProperty()
  @IsNumber()
  wig_bride: number;
  @ApiProperty()
  @IsNumber()
  video_husband: number;
  @ApiProperty()
  @IsNumber()
  video_bride: number;
  @ApiProperty()
  @IsNumber()
  etc_husband: number;
  @ApiProperty()
  @IsNumber()
  etc_bride: number;
  @ApiProperty()
  @IsNumber()
  rental_husband: number;
  @ApiProperty()
  @IsNumber()
  rental_bride: number;
  @ApiProperty()
  @IsNumber()
  sword_husband: number;
  @ApiProperty()
  @IsNumber()
  sword_bride: number;
  @ApiProperty()
  @IsNumber()
  glove_husband: number;
  @ApiProperty()
  @IsNumber()
  glove_bride: number;
  @ApiProperty()
  @IsNumber()
  bouquet_husband: number;
  @ApiProperty()
  @IsNumber()
  bouquet_bride: number;
  @ApiProperty()
  @IsNumber()
  ceremony_husband: number;
  @ApiProperty()
  @IsNumber()
  ceremony_bride: number;
  @ApiProperty()
  @IsNumber()
  play_husband: number;
  @ApiProperty()
  @IsNumber()
  play_bride: number;
  @ApiProperty()
  @IsNumber()
  anthem_husband: number;
  @ApiProperty()
  @IsNumber()
  anthem_bride: number;
  @ApiProperty()
  @IsNumber()
  moderator_husband: number;
  @ApiProperty()
  @IsNumber()
  moderator_bride: number;
  @ApiProperty()
  @IsNumber()
  officiate_husband: number;
  @ApiProperty()
  @IsNumber()
  officiate_bride: number;
  @ApiProperty()
  @IsNumber()
  hanbok_pre_husband: number;
  @ApiProperty()
  @IsNumber()
  hanbok_pre_bride: number;
  @ApiProperty()
  @IsNumber()
  hanbok_post_husband: number;
  @ApiProperty()
  @IsNumber()
  hanbok_post_bride: number;
  @ApiProperty()
  @IsString()
  meals: string;
  @ApiProperty()
  @IsNumber()
  meals_price: number;
  @ApiProperty()
  @IsNumber()
  meals_num_husband: number;
  @ApiProperty()
  @IsNumber()
  meals_num_bride: number;
  @ApiProperty()
  @IsString()
  present: string;
  @ApiProperty()
  @IsNumber()
  present_price: number;
  @ApiProperty()
  @IsNumber()
  present_num_husband: number;
  @ApiProperty()
  @IsNumber()
  present_num_bride: number;
  @ApiProperty()
  @IsString()
  reserve: string;
  @ApiProperty()
  @IsNumber()
  reserve_pay: number;
  @ApiProperty()
  @IsNumber()
  cost_husband: number;
  @ApiProperty()
  @IsNumber()
  cost_bride: number;
  @ApiProperty()
  @IsNumber()
  meal_husband: number;
  @ApiProperty()
  @IsNumber()
  meal_bride: number;
  @ApiProperty()
  @IsNumber()
  present_husband: number;
  @ApiProperty()
  @IsNumber()
  present_bride: number;
  @ApiProperty()
  @IsNumber()
  reserve_husband: number;
  @ApiProperty()
  @IsNumber()
  reserve_bride: number;
  @ApiProperty()
  @IsNumber()
  prepayment_husband: number;
  @ApiProperty()
  @IsNumber()
  prepayment_bride: number;
}

export class UpdateExpenseDto extends ExpenseDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  id: string;
} 