import { Module } from '@nestjs/common';
import { ProjectsController } from './projects.controller';
import { ProjectsService } from './projects.service';
import { DatabaseModule } from 'src/database/database.module';
import { OwnershipModule } from 'src/ownership/ownership.module';

@Module({
  controllers: [ProjectsController],
  providers: [ProjectsService],
  imports: [DatabaseModule, OwnershipModule],
})
export class ProjectsModule {}
