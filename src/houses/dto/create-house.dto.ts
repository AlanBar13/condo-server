import { ApiProperty } from '@nestjs/swagger';

export class CreateHouseDto {
  @ApiProperty()
  readonly condoId: number;

  @ApiProperty()
  readonly number: number;

  @ApiProperty()
  readonly address: string;
}
