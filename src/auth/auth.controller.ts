import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { SignInDTO } from './dto/sign-in.dto';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: 200, description: 'User logged in successfully' })
  @Post('login')
  async signIn(@Body() signInDTO: SignInDTO) {
    return this.authService.singIn(signInDTO.username, signInDTO.password);
  }

  @ApiResponse({ status: 200, description: 'User information' })
  @ApiResponse({ status: 401, description: 'User not authorized' })
  @ApiResponse({ status: 404, description: 'User not found' })
  @ApiResponse({
    status: 403,
    description: 'User may have not been added to a house',
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
