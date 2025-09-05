import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { MembersModule } from './members/members.module';
import { AuthModule } from './auth/auth.module';
import { HashingModule } from './hashing/hashing.module';

@Module({
  imports: [DatabaseModule, MembersModule, AuthModule, HashingModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
