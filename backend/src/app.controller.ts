import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Public } from './common/decorators/public.decorator';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // To test API requests that requires JWT
  // /protected-test endpoint
  @Get('protected-test')
  getProctectedTestMessage() {
    return this.appService.getTestMessage('Privately hello from todowinn!');
  }

  // To test API requests without JWT
  // /public-test endpoint
  @Public() // Bypass AuthGuard JWT check
  @Get('public-test')
  getPublicTestMessage() {
    return this.appService.getTestMessage('Publicly hello from todowinn!');
  }
}
