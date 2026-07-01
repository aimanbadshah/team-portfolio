import { Controller, Get, Post, Delete, Body, Param } from '@nestjs/common';
import { SkillService } from './skill.service';

@Controller('skills')
export class SkillController {
  constructor(private skillService: SkillService) {}

  @Get()
  findAll() {
    return this.skillService.findAll();
  }

  @Post()
  assign(@Body() body: { skillName: string; memberId: string }) {
    return this.skillService.assign(body.skillName, body.memberId);
  }

  @Delete(':skillName/members/:memberId')
  unassign(
    @Param('skillName') skillName: string,
    @Param('memberId') memberId: string,
  ) {
    return this.skillService.unassign(skillName, memberId);
  }
}
