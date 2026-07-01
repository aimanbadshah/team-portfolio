import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { TeamModule } from './team/team.module.js';
import { ProjectModule } from './project/project.module';
import { SkillModule } from './skill/skill.module';
import { PrismaModule } from './prisma/prisma.module.js';

@Module({
  imports: [TeamModule, ProjectModule, SkillModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
