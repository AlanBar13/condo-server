import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { HousesModule } from './houses/houses.module';

@Module({
  imports: [UsersModule, HousesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
