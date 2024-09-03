import { Module } from '@nestjs/common';
import { VisitantService } from './visitant.service';
import { VisitantController } from './visitant.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Visitant } from './entities/visitant.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Visitant])],
  controllers: [VisitantController],
  providers: [VisitantService],
})
export class VisitantModule {}
