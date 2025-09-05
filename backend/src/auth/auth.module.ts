import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { HashingModule } from 'src/hashing/hashing.module';
import { AuthController } from './auth.controller';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  providers: [AuthService],
  exports: [AuthService],
  imports: [HashingModule, DatabaseModule],
  controllers: [AuthController],
})
export class AuthModule {}
