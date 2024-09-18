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
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: "Creates a user" })
  @ApiResponse({ status: 201, description: 'User created successfully' })
  @HttpCode(HttpStatus.CREATED)
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @ApiOperation({ summary: "Gets all users" })
  @ApiResponse({ status: 200, description: 'List of all the users available' })
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @ApiOperation({ summary: "Gets one user" })
  @ApiResponse({ status: 200, description: 'User information' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @ApiOperation({ summary: "Updates a user" })
  @ApiResponse({ status: 200, description: 'User updated successfully' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @ApiOperation({ summary: "Deletes a user" })
  @ApiResponse({ status: 200, description: 'User deleted successfully' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }

  @ApiOperation({ summary: "Adds a user to a house" })
  @ApiResponse({ status: 200, description: 'User added to House successfully' })
  @Post(':id/house/:houseId')
  addUserToHouse(@Param('id') id: string, @Param('houseId') houseId: string) {
    return this.usersService.addUserToHouse(+id, +houseId);
  }

  @ApiOperation({ summary: "Removes a user from a house" })
  @ApiResponse({
    status: 200,
    description: 'User removed to House successfully',
  })
  @Delete(':id/house/:houseId')
  deleteUserFromHouse(
    @Param('id') id: string,
    @Param('houseId') houseId: string,
  ) {
    return this.usersService.removeUserFromHouse(+id, +houseId);
  }
}
