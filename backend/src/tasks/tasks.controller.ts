import {
  Body,
  Controller,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CreateTaskDTO } from './dto/create-task.dto';
import { TasksService } from './tasks.service';
import { OwnershipGuard } from 'src/ownership/ownership.guard';
import { ResourceType } from 'src/common/types/resource.types';
import { UpdateTaskDTO } from './dto/update-task.dto';

// /tasks endpoint
@Controller('tasks')
export class TasksController {
  constructor(private readonly taskService: TasksService) {}

  // Create task
  @Post()
  @UseGuards(
    OwnershipGuard(ResourceType.PROJECT, (req) =>
      Number((req.body as CreateTaskDTO).project_id),
    ), // Checks if user owns project since it is connected to tasks
  )
  async createTask(@Body() createTaskDTO: CreateTaskDTO) {
    return await this.taskService.createTask(createTaskDTO);
  }

  // Update task
  @Patch(':id')
  @UseGuards(
    OwnershipGuard(ResourceType.TASK, (req) => Number(req.params['id'])), // Checks if user owns task
  )
  async updateTask(
    @Param('id', ParseIntPipe) id: number, // Automatically convert to number
    @Body() updateTaskDTO: UpdateTaskDTO,
  ) {
    return await this.taskService.updateTask(id, updateTaskDTO);
  }
}
