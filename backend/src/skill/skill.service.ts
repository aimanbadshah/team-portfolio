import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SkillService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    const skills = await this.prisma.skill.findMany({
      orderBy: { name: 'asc' },
      include: {
        members: {
          include: { member: true },
        },
      },
    });
    return skills.map((s) => ({
      id: s.id,
      name: s.name,
      members: s.members.map((ms) => ({
        id: ms.member.id,
        name: ms.member.name,
      })),
    }));
  }

  async assign(skillName: string, memberId: string) {
    const skill = await this.prisma.skill.upsert({
      where: { name: skillName },
      update: {},
      create: { name: skillName },
    });
    return this.prisma.memberSkill.create({
      data: { skillId: skill.id, memberId },
    });
  }

  async unassign(skillName: string, memberId: string) {
    const skill = await this.prisma.skill.findUnique({ where: { name: skillName } });
    if (!skill) return null;
    return this.prisma.memberSkill.delete({
      where: { memberId_skillId: { memberId, skillId: skill.id } },
    });
  }
}
