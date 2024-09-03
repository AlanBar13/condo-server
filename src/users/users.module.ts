import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { House } from 'src/houses/entities/house.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User]), TypeOrmModule.forFeature([House])],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
