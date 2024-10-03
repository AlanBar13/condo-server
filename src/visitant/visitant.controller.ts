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
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { Request as ExpressRequest } from 'express';
import { RequestUser } from 'src/decorators/user.decorator';
import { TokenInfo } from 'src/auth/auth.service';

@ApiTags('Visitant')
@Controller('visitant')
export class VisitantController {
  constructor(private readonly visitantService: VisitantService) {}

  @ApiOperation({ summary: 'Creates a visitant request' })
  @ApiResponse({ status: 201, description: 'Visitant created successfully' })
  @ApiBearerAuth()
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(AuthGuard)
  @Post()
  create(
    @Request() req: ExpressRequest,
    @Body() createVisitantDto: CreateVisitantDto,
    @RequestUser() user: TokenInfo,
  ) {
    return this.visitantService.create(createVisitantDto, user, req);
  }

  @ApiOperation({ summary: 'Gets all visitant requests' })
  @ApiResponse({
    status: 200,
    description: 'List of all the vistants available',
  })
  @Get()
  findAll() {
    return this.visitantService.findAll();
  }

  @ApiOperation({ summary: 'Gets a visitant request' })
  @ApiResponse({ status: 200, description: 'Visitant information' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.visitantService.findOne(id);
  }

  @ApiOperation({ summary: 'Updates a visitant request' })
  @ApiResponse({ status: 200, description: 'Visitant updated successfully' })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateVisitantDto: UpdateVisitantDto,
  ) {
    return this.visitantService.update(id, updateVisitantDto);
  }

  @ApiOperation({ summary: 'Deletes a visitant request' })
  @ApiResponse({ status: 200, description: 'Visitant deleted successfully' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.visitantService.remove(id);
  }
}
