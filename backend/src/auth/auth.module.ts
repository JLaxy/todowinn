import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { HashingModule } from 'src/hashing/hashing.module';
import { AuthController } from './auth.controller';
import { DatabaseModule } from 'src/database/database.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth.guard';

@Module({
  providers: [AuthService, { provide: APP_GUARD, useClass: AuthGuard }],
  exports: [AuthService],
  imports: [
    HashingModule,
    DatabaseModule,
    // Activate JWT module to be global
    JwtModule.register({
      global: true,
      // Secret key for encoding/decoding
      secret: jwtConstants.secret,
    }),
  ],
  controllers: [AuthController],
})
export class AuthModule {}
