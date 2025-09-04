import { Module } from '@nestjs/common';
import { MembersController } from './members.controller';
import { DatabaseModule } from 'src/database/database.module';
import { MembersService } from './members.service';
import { PasswordModule } from 'src/password/password.module';

@Module({
  controllers: [MembersController],
  imports: [DatabaseModule, PasswordModule],
  providers: [MembersService],
})
export class MembersModule {}
