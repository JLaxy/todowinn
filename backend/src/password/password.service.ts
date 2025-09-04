import { Injectable } from '@nestjs/common';
import * as argon2 from 'argon2';

@Injectable()
export class PasswordService {
  private readonly saltRounds = 28;

  async hash(password: string) {
    return await argon2.hash(password);
  }

  async verify(password: string, hashed: string) {
    return await argon2.verify(hashed, password);
  }
}
