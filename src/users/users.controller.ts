import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post()
  @ApiResponse({ status: 201, description: 'User created successfully' })
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @ApiResponse({ status: 200, description: 'List of all the users available' })
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'User information' })
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  @ApiResponse({ status: 200, description: 'User updated successfully' })
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  @ApiResponse({ status: 200, description: 'User deleted successfully' })
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }

  @Post(':id/house/:houseId')
  @ApiResponse({ status: 200, description: 'User added to House successfully' })
  addUserToHouse(@Param('id') id: string, @Param('houseId') houseId: string) {
    return this.usersService.addUserToHouse(+id, +houseId);
  }

  @Delete(':id/house/:houseId')
  @ApiResponse({
    status: 200,
    description: 'User removed to House successfully',
  })
  deleteUserFromHouse(
    @Param('id') id: string,
    @Param('houseId') houseId: string,
  ) {
    return this.usersService.removeUserFromHouse(+id, +houseId);
  }
}
