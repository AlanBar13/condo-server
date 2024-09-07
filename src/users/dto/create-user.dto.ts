import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from '../entities/user.entity';

export class CreateUserDto {
  @ApiProperty()
  readonly name: string;

  @ApiProperty()
  readonly email: string;

  @ApiProperty()
  readonly password: string;

  @ApiProperty()
  readonly lastName: string;

  @ApiProperty()
  readonly isOwner: boolean;

  @ApiProperty({ enum: ['admin', 'user'] })
  readonly role: UserRole;
}
