import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Misc')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiOperation({ summary: "Pings server" })
  @ApiResponse({ status: 200, description: 'Gets Hello World' })
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
