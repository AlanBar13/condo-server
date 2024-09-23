import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CondoService } from './condo.service';
import { CreateCondoDto } from './dto/create-condo.dto';
import { UpdateCondoDto } from './dto/update-condo.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Condo')
@Controller('condo')
export class CondoController {
  constructor(private readonly condoService: CondoService) {}

  @ApiOperation({ summary: 'Creates a condo' })
  @ApiResponse({ status: 201, description: 'Condo created successfully' })
  @Post()
  create(@Body() createCondoDto: CreateCondoDto) {
    return this.condoService.create(createCondoDto);
  }

  @ApiOperation({ summary: 'Gets all condos' })
  @ApiResponse({ status: 201, description: 'List of all the condos available' })
  @Get()
  findAll() {
    return this.condoService.findAll();
  }

  @ApiOperation({ summary: 'Gets a condo' })
  @ApiResponse({ status: 201, description: 'Condo information' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.condoService.findOne(+id);
  }

  @ApiOperation({ summary: 'Updates a condo' })
  @ApiResponse({ status: 201, description: 'Condo updated successfully' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCondoDto: UpdateCondoDto) {
    return this.condoService.update(+id, updateCondoDto);
  }

  @ApiOperation({ summary: 'Deletes a condo' })
  @ApiResponse({ status: 201, description: 'Condo deleted successfully' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.condoService.remove(+id);
  }
}
