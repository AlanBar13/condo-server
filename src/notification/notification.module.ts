import { Module } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { NotificationController } from './notification.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotificationToken } from './entities/notification-token.entity';

@Module({
  imports: [TypeOrmModule.forFeature([NotificationToken])],
  controllers: [NotificationController],
  providers: [NotificationService],
})
export class NotificationModule {}
