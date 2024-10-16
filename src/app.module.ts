import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { HousesModule } from './houses/houses.module';
import { VisitantModule } from './visitant/visitant.module';
import { AuthModule } from './auth/auth.module';
import { FilesModule } from './files/files.module';
import { CondoModule } from './condo/condo.module';
import { NotificationModule } from './notification/notification.module';
import { AnnouncementModule } from './announcement/announcement.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DATABASE_HOST'),
        port: +configService.get('DATABASE_PORT'),
        username: configService.get('DATABASE_USER'),
        password: configService.get('DATABASE_PASSWORD'),
        database: configService.get('DATABASE_NAME'),
        ssl: true,
        autoLoadEntities: true,
        synchronize: true, // Remove this for prod
        //logging: true
      }),
      inject: [ConfigService],
    }),
    UsersModule,
    HousesModule,
    VisitantModule,
    AuthModule,
    FilesModule,
    CondoModule,
    NotificationModule,
    AnnouncementModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
