import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getTestMessage(message: string): string {
    return message;
  }
}
