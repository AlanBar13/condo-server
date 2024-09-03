import { ApiProperty } from '@nestjs/swagger';

export class SignInDTO {
  @ApiProperty()
  readonly username: string;

  @ApiProperty()
  readonly password: string;
}
