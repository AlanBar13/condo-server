import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
  Res
} from '@nestjs/common';
import { NotificationService } from './notification.service';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import {
  AcceptNotificationDTO,
  NotificationDTO,
  SingleNotificationDTO,
} from './dto/notification.dto';
import { Request as ExpressRequest, Response } from 'express';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RequestUser } from 'src/decorators/user.decorator';
import { UpdateNotificationDTO } from './dto/update-notification.dto';
import { TokenInfo } from 'src/auth/auth.service';

@ApiTags('Notifications')
@Controller('notification')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @ApiOperation({ summary: 'Retrieves all notification tokens' })
  @ApiResponse({ status: 200, description: 'List of all notification tokens' })
  @Get('token')
  async getNotificationTokens(
    @Res() res: Response,
  ) {
    const tokens = await this.notificationService.getNotificationTokens();
    res.status(200).json(tokens);
  }

  @ApiOperation({ summary: 'Retrieves all notification tokens' })
  @ApiResponse({ status: 200, description: 'List of all notification tokens' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Get('user/token')
  async getNotificationToken(
    @Res() res: Response,
    @RequestUser() user: TokenInfo,
  ) {
    const token = await this.notificationService.getNotificationToken(user);
    res.status(200).json(token);
  }

  @ApiOperation({ summary: 'Register notification token for user' })
  @ApiResponse({ status: 201, description: 'Token registration successful' })
  @ApiBearerAuth()
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(AuthGuard)
  @Post('subscribe')
  registerNotificationToken(
    @Body() acceptNotificationDTO: AcceptNotificationDTO,
    @RequestUser() user: TokenInfo,
  ) {
    return this.notificationService.acceptPushNotification(
      user,
      acceptNotificationDTO,
    );
  }

  @ApiOperation({ summary: 'Disables token on DB' })
  @ApiResponse({ status: 200, description: 'User token disabled' })
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @Post('unsubscribe')
  disableNotificationToken(
    @Body() updateDTO: UpdateNotificationDTO,
    @RequestUser() user: TokenInfo,
  ) {
    return this.notificationService.disablePushNotification(user, updateDTO);
  }

  @ApiOperation({ summary: 'Send single notification to certain token' })
  @ApiResponse({ status: 200, description: 'Notification sent successfully' })
  @HttpCode(HttpStatus.OK)
  @Post()
  sendNotification(@Body() notificationDTO: SingleNotificationDTO) {
    return this.notificationService.sendNotification(notificationDTO);
  }

  @ApiOperation({ summary: 'Send single notification to certain user' })
  @ApiResponse({ status: 200, description: 'Notification sent successfully' })
  @HttpCode(HttpStatus.OK)
  @Post('single')
  sendSingleNotification(@Body() notificationDTO: NotificationDTO) {
    return this.notificationService.sendSingleNotification(notificationDTO);
  }

  @ApiOperation({ summary: 'Send multiple notifications to certain tokens' })
  @ApiResponse({ status: 200, description: 'Notifications sent successfully' })
  @HttpCode(HttpStatus.OK)
  @Post('multiple')
  sendMultipleNotifications(@Body() notificationDTO: NotificationDTO) {
    return this.notificationService.sendMultipleNotification(notificationDTO);
  }

  //TODO: implement topic notification workflow, subscribe users, unsubscribe users, send topi notification
}
