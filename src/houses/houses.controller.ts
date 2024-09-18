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
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { UserRole } from 'src/users/entities/user.entity';

@ApiTags('Houses')
@Controller('houses')
export class HousesController {
  constructor(private readonly housesService: HousesService) {}

  @ApiOperation({ summary: 'Creates a house' })
  @ApiResponse({ status: 201, description: 'House created successfully' })
  @ApiBearerAuth()
  @HttpCode(HttpStatus.CREATED)
  @Roles(UserRole.ADMIN, UserRole.DEV)
  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createHouseDto: CreateHouseDto) {
    return this.housesService.create(createHouseDto);
  }

  @ApiOperation({ summary: 'Gets all houses' })
  @ApiResponse({ status: 200, description: 'List of all the houses available' })
  @Get()
  findAll() {
    return this.housesService.findAll();
  }

  @ApiOperation({ summary: 'Gets single house' })
  @ApiResponse({ status: 200, description: 'House information' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.housesService.findOne(+id);
  }

  @ApiOperation({ summary: 'Updates a house' })
  @ApiResponse({ status: 200, description: 'House updated successfully' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHouseDto: UpdateHouseDto) {
    return this.housesService.update(+id, updateHouseDto);
  }

  @ApiOperation({ summary: 'Deletes a house' })
  @ApiResponse({ status: 200, description: 'House deleted successfully' })
  @ApiBearerAuth()
  //@UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.housesService.remove(+id);
  }
}
