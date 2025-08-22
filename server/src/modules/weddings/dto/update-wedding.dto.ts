import { PartialType } from '@nestjs/swagger';
import { AddWeddingDto } from './add-wedding.dto';

export class UpdateWeddingDto extends PartialType(AddWeddingDto) {}
