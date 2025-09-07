import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class OwnershipService {
  constructor(private readonly databaseService: DatabaseService) {}

  // Verifies if member owns the project
  async verifyProjectOwner(member_id: number, project_id: number) {
    // Retrieve project from database
    const project = await this.databaseService.projects.findUnique({
      where: {
        project_id: project_id,
      },
    });

    if (!project)
      throw new NotFoundException(
        `Project with id ${project_id} does not exist!`,
      );

    // Check ownership
    if (project.member_id != member_id)
      throw new ForbiddenException('You do not own this project');

    return project;
  }

  // Verifies if member owns the project
  async verifyTaskOwner(member_id: number, task_id: number) {
    // Retrieve task, binding project
    const task = await this.databaseService.tasks.findUnique({
      where: {
        task_id: task_id,
      },
      include: { project: true },
    });

    if (!task)
      throw new NotFoundException(`Task with id ${task_id} does not exist!`);

    // Check ownership
    if (task.project.member_id != member_id)
      throw new ForbiddenException('You do not own this task');

    return task;
  }

  async verifyMemberOwner(member_id: number, id: number) {
    const member = await this.databaseService.members.findUnique({
      where: { member_id: id },
    });

    if (!member)
      throw new NotFoundException(`Member with id ${id} does not exist!`);

    if (member_id !== id)
      throw new ForbiddenException('You do not own this member');

    return;
  }
}
