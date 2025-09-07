import {
  Body,
  Controller,
  Get,
  ParseIntPipe,
  Post,
  Patch,
  Param,
  UseGuards,
} from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDTO } from './dto/create-project.dto';
import { CurrentUser } from 'src/common/decorators/current-member.decorator';
import { UpdateProjectDTO } from './dto/update-project.dto';
import { OwnershipGuard } from 'src/ownership/ownership.guard';
import { ResourceType } from 'src/common/types/resource.types';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  // Get all projects of user
  @Get()
  async getAllProjects(@CurrentUser() member_id: number) {
    return this.projectsService.getAllProjects(member_id);
  }

  // Create project
  @Post()
  async createProject(
    @CurrentUser() member_id: number,
    @Body() createProjectDTO: CreateProjectDTO,
  ) {
    return this.projectsService.createProject(member_id, createProjectDTO);
  }

  // Update project
  @Patch(':id')
  @UseGuards(OwnershipGuard(ResourceType.PROJECT, 'id'))
  async updateProject(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProjectDTO: UpdateProjectDTO,
  ) {
    return this.projectsService.updateProject(id, updateProjectDTO);
  }
}
