import { ApiProperty } from '@nestjs/swagger';

export class CreateHouseDto {
  @ApiProperty()
  readonly condo: string;

  @ApiProperty()
  readonly number: number;

  @ApiProperty()
  readonly address: string;
}
