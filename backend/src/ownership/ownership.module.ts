import { Module } from '@nestjs/common';
import { OwnershipService } from './ownership.service';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  providers: [OwnershipService],
  imports: [DatabaseModule],
  exports: [OwnershipService],
})
export class OwnershipModule {}
