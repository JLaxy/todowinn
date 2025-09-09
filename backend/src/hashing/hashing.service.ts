import { Injectable } from '@nestjs/common';
import * as argon2 from 'argon2';

@Injectable()
export class HashingService {
  // Hash password using Argon2 algorithm
  async hash(password: string) {
    return await argon2.hash(password);
  }

  // Verify password using hash
  async verify(password: string, hashed: string) {
    return await argon2.verify(hashed, password);
  }
}
