import { Injectable, Logger } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import {
  seedChangelogs,
  seedMembers,
  seedProjects,
  seedTasks,
} from './seeder.data';

@Injectable()
export class SeederService {
  constructor(private readonly databaseService: DatabaseService) {}

  // Seed database with data
  async seedDatabase() {
    Logger.log('Seeding database...');

    // Empty Database first
    await this.databaseService.members.deleteMany();
    await this.databaseService.projects.deleteMany();
    await this.databaseService.tasks.deleteMany();

    // Seed
    const members = await this.databaseService.members.createMany({
      data: seedMembers,
    });
    const projects = await this.databaseService.projects.createMany({
      data: seedProjects,
    });
    const tasks = await this.databaseService.tasks.createMany({
      data: seedTasks,
    });
    const changelogs = await this.databaseService.changelogs.createMany({
      data: seedChangelogs,
    });

    Logger.log(
      `Successfully seeded ${members.count} members, ${projects.count} projects, ${tasks.count} tasks, ${changelogs.count} changelogs,`,
    );

    return {
      members: members.count,
      projects: projects.count,
      tasks: tasks.count,
      changelogs: changelogs.count
    };
  }
}
