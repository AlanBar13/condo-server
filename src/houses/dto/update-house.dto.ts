import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateHouseDto } from './create-house.dto';

export class UpdateHouseDto extends PartialType(CreateHouseDto) {
  @ApiProperty()
  readonly condoId: number;

  @ApiProperty()
  readonly number: number;

  @ApiProperty()
  readonly address: string;
}
