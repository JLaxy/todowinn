import { Module } from '@nestjs/common';
import { MembersController } from './members.controller';
import { DatabaseModule } from 'src/database/database.module';
import { MembersService } from './members.service';

@Module({
  controllers: [MembersController],
  imports: [DatabaseModule],
  providers: [MembersService],
})
export class MembersModule {}
