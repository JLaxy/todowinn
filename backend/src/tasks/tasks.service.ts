import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreateTaskDTO } from './dto/create-task.dto';
import { TaskMapper } from './tasks.mapper';
import { plainToInstance } from 'class-transformer';
import { ResponseTaskDTO } from './dto/response-task.dto';
import { UpdateTaskDTO } from './dto/update-task.dto';
import { ProjectsService } from 'src/projects/projects.service';

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

    return task;
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
    return plainToInstance(ResponseTaskDTO, updatedTask, {
      excludeExtraneousValues: true,
    });
  }
}
