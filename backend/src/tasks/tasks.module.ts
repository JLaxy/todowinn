import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { DatabaseModule } from 'src/database/database.module';
import { OwnershipModule } from 'src/ownership/ownership.module';
import { ProjectsService } from 'src/projects/projects.service';

@Module({
  controllers: [TasksController],
  providers: [TasksService, ProjectsService],
  imports: [DatabaseModule, OwnershipModule],
})
export class TasksModule {}
