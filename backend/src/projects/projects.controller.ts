import { CreateProjectDTO } from './dto/create-project.dto';
import { UpdateProjectDTO } from './dto/update-project.dto';
import { ProjectsService } from './projects.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectService: ProjectsService) {}

  // Get all projects
  @Get()
  getAllProjects() {
    return this.projectService.getAllProjects();
  }

  // Get specific project
  @Get(':id')
  getProject(@Param('id', ParseIntPipe) id: number) {
    return this.projectService.getProject(id);
  }

  // Create new project
  @Post()
  createProject(
    @Body()
    createUserDTO: CreateProjectDTO,
  ) {
    return this.projectService.createProject(createUserDTO);
  }

  // Update project
  @Patch(':id')
  updateProject(
    @Param('id', ParseIntPipe) id: number,
    @Body()
    updateProjectDTO: UpdateProjectDTO,
  ) {
    return this.projectService.updateProject(id, updateProjectDTO);
  }

  @Delete(':id')
  deleteProject(@Param('id', ParseIntPipe) id: number) {
    return this.projectService.deleteProject(id);
  }
}
