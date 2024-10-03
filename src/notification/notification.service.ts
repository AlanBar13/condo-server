import {
  Injectable,
  Logger,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as firebase from 'firebase-admin';
import * as path from 'path';
import { Repository, In } from 'typeorm';
import {
  NotificationStatus,
  NotificationToken,
} from './entities/notification-token.entity';
import {
  NotificationDTO,
  AcceptNotificationDTO,
  TopicNotificationDTO,
  SingleNotificationDTO,
} from './dto/notification.dto';
import { UpdateNotificationDTO } from './dto/update-notification.dto';
import { TokenInfo } from 'src/auth/auth.service';

firebase.initializeApp({
  credential: firebase.credential.cert(
    path.join(__dirname, '..', '..', 'firebase-admin-sdk.json'),
  ),
});

@Injectable()
export class NotificationService {
  constructor(
    @InjectRepository(NotificationToken)
    private notificationTokenRepository: Repository<NotificationToken>,
  ) {}

  async acceptPushNotification(
    user: TokenInfo,
    notificationDto: AcceptNotificationDTO,
  ) {
    await this.notificationTokenRepository.update(
      { userId: user.id },
      { status: NotificationStatus.INACTIVE },
    );

    const notificationToken = new NotificationToken();
    notificationToken.userId = user.id;
    notificationToken.deviceType = notificationDto.deviceType;
    notificationToken.notificationToken = notificationDto.notificationToken;
    notificationToken.status = NotificationStatus.ACTIVE;

    return await this.notificationTokenRepository.save(notificationToken);
  }

  async disablePushNotification(
    user: TokenInfo,
    updateNotificationDto: UpdateNotificationDTO,
  ) {
    try {
      await this.notificationTokenRepository.update(
        { userId: user.id, deviceType: updateNotificationDto.deviceType },
        { status: NotificationStatus.INACTIVE },
      );
    } catch (error) {
      Logger.warn(error);
    }
  }

  async sendNotification(notificationDto: SingleNotificationDTO) {
    try {
      const response = await firebase.messaging().send({
        token: notificationDto.token,
        webpush: {
          notification: {
            title: notificationDto.title,
            body: notificationDto.body,
          },
        },
      });
      return response;
    } catch (error) {
      Logger.warn(error);
      throw new InternalServerErrorException();
    }
  }

  async sendSingleNotification(notificationDto: NotificationDTO) {
    try {
      if (
        notificationDto.userIds.length > 1 ||
        notificationDto.userIds.length === 0
      ) {
        throw new BadRequestException('UserIds should be exactly 1');
      }

      const { notificationToken } =
        await this.notificationTokenRepository.findOne({
          where: { id: notificationDto.userIds[0] },
        });
      const response = await firebase.messaging().send({
        token: notificationToken,
        webpush: {
          notification: {
            title: notificationDto.title,
            body: notificationDto.body,
          },
        },
      });
      return response;
    } catch (error) {
      Logger.warn(error);
      throw new InternalServerErrorException();
    }
  }

  async sendMultipleNotification(notificationDto: NotificationDTO) {
    try {
      if (notificationDto.userIds.length <= 1) {
        throw new BadRequestException('UserIds should be more than 1');
      }

      const results = await this.notificationTokenRepository.find({
        where: {
          id: In(notificationDto.userIds),
          status: NotificationStatus.ACTIVE,
        },
      });
      const tokens = results.map((notToken) => {
        return notToken.notificationToken;
      });

      const response = await firebase.messaging().sendEachForMulticast({
        tokens: tokens,
        webpush: {
          notification: {
            title: notificationDto.title,
            body: notificationDto.body,
          },
        },
      });
      return {
        success: true,
        message: `Reaching ${tokens.length} users. Successfully sent ${response.successCount} messages. ${response.failureCount} failed.`,
      };
    } catch (error) {
      Logger.warn(error);
      throw new InternalServerErrorException();
    }
  }

  async sendTopicNotification(notificationDto: TopicNotificationDTO) {
    try {
      await firebase.messaging().send({
        topic: notificationDto.topic,
        notification: {
          title: notificationDto.title,
          body: notificationDto.body,
        },
      });
      return { success: true, message: 'Topic notification sent succesfully' };
    } catch (error) {
      Logger.warn(error);
      throw new InternalServerErrorException();
    }
  }

  async subscribeUserToTopic(tokens: string[], topic: string) {
    try {
      const response = await firebase
        .messaging()
        .subscribeToTopic(tokens, topic);
      Logger.log(response);
    } catch (error) {
      Logger.warn(error);
    }
  }

  async unsubscribeUserToTopic(tokens: string[], topic: string) {
    try {
      const response = await firebase
        .messaging()
        .unsubscribeFromTopic(tokens, topic);
      Logger.log(response);
    } catch (error) {
      Logger.warn(error);
    }
  }
}
