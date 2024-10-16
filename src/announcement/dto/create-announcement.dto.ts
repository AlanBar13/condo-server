import { ApiProperty } from '@nestjs/swagger';

export class CreateAnnouncementDto {
    @ApiProperty()
    readonly title: string;

    @ApiProperty()
    readonly body: string;

    @ApiProperty()
    readonly date: Date;

    @ApiProperty()
    readonly postedBy: string;
}