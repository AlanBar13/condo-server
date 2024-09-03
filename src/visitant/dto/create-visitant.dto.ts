import { ApiProperty } from '@nestjs/swagger';

export class CreateVisitantDto {
    @ApiProperty()
    readonly fullName: string;

    @ApiProperty()
    readonly startDate: Date;

    @ApiProperty()
    readonly endDate: Date;
}
