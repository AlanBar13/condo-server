import { ApiProperty } from '@nestjs/swagger';

export class UpdateNotificationDTO {
  @ApiProperty()
  readonly deviceType: string;
}
