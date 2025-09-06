import { Module } from '@nestjs/common';
import { MembersController } from './members.controller';
import { DatabaseModule } from 'src/database/database.module';
import { MembersService } from './members.service';
import { HashingModule } from 'src/hashing/hashing.module';
import { OwnershipModule } from 'src/ownership/ownership.module';

@Module({
  controllers: [MembersController],
  imports: [DatabaseModule, HashingModule, OwnershipModule],
  providers: [MembersService],
})
export class MembersModule {}
