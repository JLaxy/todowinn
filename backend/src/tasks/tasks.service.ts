import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreateTaskDTO } from './dto/create-task.dto';
import { TaskMapper } from './tasks.mapper';
import { plainToInstance } from 'class-transformer';
import { ResponseTaskDTO } from './dto/response-task.dto';
import { UpdateTaskDTO } from './dto/update-task.dto';
import { ProjectsService } from 'src/projects/projects.service';
import { Prisma, UpdateableTaskField } from 'generated/prisma';

@Injectable()
export class TasksService {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly projectsService: ProjectsService,
  ) {}

  // Retrieves specific task
  private async getTask(task_id: number) {
    const task = await this.databaseService.tasks.findUnique({
      where: { task_id },
    });

    // Throw error if task does not exist
    if (!task)
      throw new NotFoundException(`Task with id ${task_id} does not exist`);

    return plainToInstance(ResponseTaskDTO, task, {
      excludeExtraneousValues: true,
    });
  }

  public async getProjectTasks(project_id: number) {
    // Get all tasks from database
    const tasks = await this.databaseService.tasks.findMany({
      where: { project_id },
    });

    // Throw error if project does not have tasks
    if (!tasks)
      throw new NotFoundException(
        `Project with id ${project_id} has no tasks!`,
      );

    // Return list of tasks
    return tasks;
  }

  // Create task
  async createTask(createTaskDTO: CreateTaskDTO) {
    // First check if project exists
    await this.projectsService.getProject(createTaskDTO.project_id);

    const task = await this.databaseService.tasks.create({
      data: TaskMapper.toCreateEntity(createTaskDTO),
    });

    // Return in response DTO
    return plainToInstance(ResponseTaskDTO, task, {
      excludeExtraneousValues: true,
    });
  }

  // Update task
  async updateTask(task_id: number, updateTaskDTO: UpdateTaskDTO) {
    // First check if task exists
    const task = await this.getTask(task_id);

    // Copy date finished
    if (task.date_finished) updateTaskDTO.dateFinished = task.date_finished;

    // Update
    const updatedTask = await this.databaseService.tasks.update({
      data: TaskMapper.toUpdateEntity(updateTaskDTO),
      where: { task_id },
    });

    // Return in response DTO
    const updatedTaskDTO = plainToInstance(ResponseTaskDTO, updatedTask, {
      excludeExtraneousValues: true,
    });

    // Log task changes
    await this.logTaskChanges(task, updatedTaskDTO);

    return updatedTaskDTO;
  }

  private async logTaskChanges(
    oldTask: ResponseTaskDTO,
    newTask: ResponseTaskDTO,
  ) {
    const changes: Prisma.ChangelogsCreateManyInput[] = [];

    // For typesafety
    const fieldMapping: Record<string, UpdateableTaskField> = {
      status: UpdateableTaskField.STATUS,
      name: UpdateableTaskField.NAME,
      description: UpdateableTaskField.DESCRIPTION,
      date_target: UpdateableTaskField.DATE_TARGET,
      remarks: UpdateableTaskField.REMARKS,
    };

    // Normalize dates to be ISO string for comparison
    const normalizeValue = (val: unknown) => {
      if (val instanceof Date) return val.toISOString();
      return val?.toString() ?? null;
    };

    // Iterate over properties of the newTask ResponseTaskDTO
    for (const key of Object.keys(newTask) as (keyof ResponseTaskDTO)[]) {
      if (!(key in fieldMapping)) continue; // skip non-tracked fields

      // Get values; normalize if needed
      const oldValue = normalizeValue(oldTask[key]);
      const newValue = normalizeValue(newTask[key]);

      // If didnt change, skip
      if (oldValue === newValue) continue;

      // If change, add to changes array
      changes.push({
        field: fieldMapping[key as string],
        old: oldValue?.toString() ?? 'NOTHING',
        new: newValue?.toString() ?? 'NOTHING',
        task_id: newTask.task_id,
      });
    }

    // If there are changes, then log to database
    if (changes.length > 0)
      await this.databaseService.changelogs.createMany({ data: changes });
  }
}
