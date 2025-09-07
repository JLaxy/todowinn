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

@Controller('tasks')
export class TasksController {
  constructor(private readonly taskService: TasksService) {}

  @Post()
  @UseGuards(
    OwnershipGuard(ResourceType.PROJECT, (req) =>
      Number((req.body as CreateTaskDTO).project_id),
    ),
  )
  async createTask(@Body() createTaskDTO: CreateTaskDTO) {
    return await this.taskService.createTask(createTaskDTO);
  }

  @Patch(':id')
  @UseGuards(
    OwnershipGuard(ResourceType.TASK, (req) => Number(req.params['id'])),
  )
  async updateTask(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTaskDTO: UpdateTaskDTO,
  ) {
    return await this.taskService.updateTask(id, updateTaskDTO);
  }
}
