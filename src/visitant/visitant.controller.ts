import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { VisitantService } from './visitant.service';
import { CreateVisitantDto } from './dto/create-visitant.dto';
import { UpdateVisitantDto } from './dto/update-visitant.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Visitant')
@Controller('visitant')
export class VisitantController {
  constructor(private readonly visitantService: VisitantService) {}

  @Post()
  create(@Body() createVisitantDto: CreateVisitantDto) {
    return this.visitantService.create(createVisitantDto);
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
  update(@Param('id') id: string, @Body() updateVisitantDto: UpdateVisitantDto) {
    return this.visitantService.update(id, updateVisitantDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.visitantService.remove(id);
  }
}
