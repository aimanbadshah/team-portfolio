import { Controller, Get, Post, Delete, Body, Param } from '@nestjs/common';
import { TeamService } from './team.service';

@Controller('teams')
export class TeamController {
  constructor(private teamService: TeamService) {}

  @Get()
  findAll() {
    return this.teamService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.teamService.findOne(id);
  }

  @Post()
  create(@Body() body: { name: string; role?: string }) {
    return this.teamService.create(body.name, body.role);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.teamService.remove(id);
  }
}
