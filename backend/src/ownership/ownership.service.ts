import { ForbiddenException, Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class OwnershipService {
  constructor(private readonly databaseService: DatabaseService) {}

  // Verifies if member owns the project
  async verifyProjectOwner(member_id: number, project_id: number) {
    // Retrieve project from database
    const project = await this.databaseService.projects.findUniqueOrThrow({
      where: {
        project_id: project_id,
      },
    });

    // Check ownership
    if (project.member_id != member_id)
      throw new ForbiddenException('You do not own this project');

    return project;
  }

  // Verifies if member owns the project
  async verifyTaskOwner(member_id: number, task_id: number) {
    // Retrieve task, binding project
    const task = await this.databaseService.tasks.findUniqueOrThrow({
      where: {
        task_id: task_id,
      },
      include: { project: true },
    });

    // Check ownership
    if (task.project.member_id != member_id)
      throw new ForbiddenException('You do not own this project');

    return task;
  }

  async verifyMemberOwner(member_id: number, id: number) {
    await this.databaseService.members.findUniqueOrThrow({
      where: { member_id: id },
    });

    if (member_id !== id)
      throw new ForbiddenException('You do not own this member');

    return;
  }
}
