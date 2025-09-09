import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Public } from './common/decorators/public.decorator';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('protected-test')
  getProctectedTestMessage() {
    return this.appService.getTestMessage('Privately hello from todowinn!');
  }

  @Public()
  @Get('public-test')
  getPublicTestMessage() {
    return this.appService.getTestMessage('Publicly hello from todowinn!');
  }
}
