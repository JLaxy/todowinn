import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { MembersModule } from './members/members.module';
import { PasswordModule } from './password/password.module';

@Module({
  imports: [DatabaseModule, MembersModule, PasswordModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
