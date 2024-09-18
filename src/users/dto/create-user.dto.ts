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

  @ApiProperty({ nullable: true })
  readonly houseId: number;

  @ApiProperty({ enum: ['user', 'admin', 'owner'] })
  readonly role: UserRole;
}
