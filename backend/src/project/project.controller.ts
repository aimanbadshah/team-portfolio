import { Controller, Get, Post, Delete, Body, Param } from '@nestjs/common';
import { ProjectService } from './project.service';

@Controller('projects')
export class ProjectController {
  constructor(private projectService: ProjectService) {}

  @Get()
  findAll() {
    return this.projectService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.projectService.findOne(id);
  }

  @Post()
  create(
    @Body()
    body: {
      name: string;
      description?: string;
      status: string;
      startDate?: string;
      endDate?: string;
      techStack?: string[];
      members?: string[];
    },
  ) {
    return this.projectService.create(body);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.projectService.remove(id);
  }
}