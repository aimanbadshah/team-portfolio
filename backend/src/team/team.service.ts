import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TeamService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    const members = await this.prisma.member.findMany({
      include: { _count: { select: { skills: true } } },
    });
    return members.map((m) => ({
      id: m.id,
      name: m.name,
      role: m.role,
      skillCount: m._count.skills,
    }));
  }

  async findOne(id: string) {
    const member = await this.prisma.member.findUnique({
      where: { id },
      include: { skills: { include: { skill: true } } },
    });
    if (!member) return null;
    return {
      id: member.id,
      name: member.name,
      role: member.role,
      skills: member.skills.map((ms) => ({ name: ms.skill.name })),
    };
  }

  async create(name: string, role?: string) {
    return this.prisma.member.create({ data: { name, role } });
  }

  async remove(id: string) {
    await this.prisma.memberSkill.deleteMany({ where: { memberId: id } });
    return this.prisma.member.delete({ where: { id } });
  }
}
