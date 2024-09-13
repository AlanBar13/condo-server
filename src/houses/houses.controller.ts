import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { HousesService } from './houses.service';
import { CreateHouseDto } from './dto/create-house.dto';
import { UpdateHouseDto } from './dto/update-house.dto';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
//import { AuthGuard } from 'src/auth/auth.guard';

@ApiTags('Houses')
@Controller('houses')
export class HousesController {
  constructor(private readonly housesService: HousesService) {}

  @HttpCode(HttpStatus.CREATED)
  @ApiBearerAuth()
  //@UseGuards(AuthGuard)
  @Post()
  @ApiResponse({ status: 201, description: 'House created successfully' })
  create(@Body() createHouseDto: CreateHouseDto) {
    return this.housesService.create(createHouseDto);
  }

  @Get()
  @ApiResponse({ status: 200, description: 'List of all the houses available' })
  findAll() {
    return this.housesService.findAll();
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'House information' })
  findOne(@Param('id') id: string) {
    return this.housesService.findOne(+id);
  }

  @Patch(':id')
  @ApiResponse({ status: 200, description: 'House updated successfully' })
  update(@Param('id') id: string, @Body() updateHouseDto: UpdateHouseDto) {
    return this.housesService.update(+id, updateHouseDto);
  }

  @ApiBearerAuth()
  //@UseGuards(AuthGuard)
  @Delete(':id')
  @ApiResponse({ status: 200, description: 'House deleted successfully' })
  remove(@Param('id') id: string) {
    return this.housesService.remove(+id);
  }
}
