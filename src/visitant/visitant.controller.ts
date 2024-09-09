import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  UseGuards,
} from '@nestjs/common';
import { VisitantService } from './visitant.service';
import { CreateVisitantDto } from './dto/create-visitant.dto';
import { UpdateVisitantDto } from './dto/update-visitant.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { Request as ExpressRequest } from 'express';
import { RequestUser } from 'src/decorators/user.decorator';
import { User } from 'src/users/entities/user.entity';

@ApiTags('Visitant')
@Controller('visitant')
export class VisitantController {
  constructor(private readonly visitantService: VisitantService) {}

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Post()
  create(
    @Request() req: ExpressRequest,
    @Body() createVisitantDto: CreateVisitantDto,
    @RequestUser() user: User
  ) {
    return this.visitantService.create(createVisitantDto, user, req);
  }

  @Get()
  findAll() {
    return this.visitantService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.visitantService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateVisitantDto: UpdateVisitantDto,
  ) {
    return this.visitantService.update(id, updateVisitantDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.visitantService.remove(id);
  }
}
