import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { MembersModule } from './members/members.module';
import { AuthModule } from './auth/auth.module';
import { HashingModule } from './hashing/hashing.module';
import { OwnershipModule } from './ownership/ownership.module';

@Module({
  imports: [DatabaseModule, MembersModule, AuthModule, HashingModule, OwnershipModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
