import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto extends PartialType(CreateUserDto) {
    @ApiProperty()
    readonly name: string;

    @ApiProperty()
    readonly email: string;

    @ApiProperty()
    readonly lastName: string;

    @ApiProperty()
    readonly isOwner: boolean
}
