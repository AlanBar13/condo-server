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
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { VisitantService } from './visitant.service';
import { CreateVisitantDto } from './dto/create-visitant.dto';
import { UpdateVisitantDto } from './dto/update-visitant.dto';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { Request as ExpressRequest } from 'express';
import { RequestUser } from 'src/decorators/user.decorator';
import { User } from 'src/users/entities/user.entity';

@ApiTags('Visitant')
@Controller('visitant')
export class VisitantController {
  constructor(private readonly visitantService: VisitantService) {}

  @HttpCode(HttpStatus.CREATED)
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Post()
  @ApiResponse({ status: 201, description: 'Visitant created successfully' })
  create(
    @Request() req: ExpressRequest,
    @Body() createVisitantDto: CreateVisitantDto,
    @RequestUser() user: User,
  ) {
    return this.visitantService.create(createVisitantDto, user, req);
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'List of all the vistants available',
  })
  findAll() {
    return this.visitantService.findAll();
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'Visitant information' })
  findOne(@Param('id') id: string) {
    return this.visitantService.findOne(id);
  }

  @Patch(':id')
  @ApiResponse({ status: 200, description: 'Visitant updated successfully' })
  update(
    @Param('id') id: string,
    @Body() updateVisitantDto: UpdateVisitantDto,
  ) {
    return this.visitantService.update(id, updateVisitantDto);
  }

  @Delete(':id')
  @ApiResponse({ status: 200, description: 'Visitant deleted successfully' })
  remove(@Param('id') id: string) {
    return this.visitantService.remove(id);
  }
}
