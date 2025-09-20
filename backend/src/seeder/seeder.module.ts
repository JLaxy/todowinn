import { Module } from '@nestjs/common';
import { SeederController } from './seeder.controller';
import { SeederService } from './seeder.service';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  controllers: [SeederController],
  providers: [SeederService],
  imports: [DatabaseModule],
})
export class SeederModule {}
