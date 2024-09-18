import { ApiProperty } from '@nestjs/swagger';

export class CreateCondoDto {
    @ApiProperty()
    readonly name: string;

    @ApiProperty()
    readonly NHouses: number;

    @ApiProperty()
    readonly address: string;
}
