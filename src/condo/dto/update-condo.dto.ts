import { PartialType } from '@nestjs/swagger';
import { CreateCondoDto } from './create-condo.dto';

export class UpdateCondoDto extends PartialType(CreateCondoDto) {}
