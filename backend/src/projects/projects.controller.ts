import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

@Controller('projects')
export class ProjectsController {
  // Get all projects
  @Get()
  getAllProjects() {
    return 'all projects';
  }

  // Get specific project
  @Get(':id')
  getProject(@Param('id') id: string) {
    return `project ${id}`;
  }

  // Create new project
  @Post()
  newProject(@Body() project: {}) {
    return project;
  }

  // Update project
  @Patch(':id')
  updateProject(@Param('id') id: string, @Body() updatedInfo: {}) {
    return `updated project with id ${id}, containing ${JSON.stringify(updatedInfo)}`;
  }

  @Delete(':id')
  deleteProject(@Param('id') id: string) {
    return `deleted project with id ${id}`;
  }
}
