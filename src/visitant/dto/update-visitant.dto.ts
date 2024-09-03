import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateVisitantDto } from './create-visitant.dto';

export class UpdateVisitantDto extends PartialType(CreateVisitantDto) {
  @ApiProperty()
  readonly fullName: string;

  @ApiProperty()
  readonly startDate: Date;

  @ApiProperty()
  readonly endDate: Date;
}
