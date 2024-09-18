import { Module } from '@nestjs/common';
import { CondoService } from './condo.service';
import { CondoController } from './condo.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Condo } from './entities/condo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Condo])],
  controllers: [CondoController],
  providers: [CondoService],
})
export class CondoModule {}
