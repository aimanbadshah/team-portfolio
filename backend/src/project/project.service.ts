import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProjectService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.project.findMany();
  }

  findOne(id: string) {
    return this.prisma.project.findUnique({ where: { id } });
  }

  create(data: {
    name: string;
    description?: string;
    status: string;
    startDate?: string;
    endDate?: string;
    techStack?: string[];
    members?: string[];
  }) {
    return this.prisma.project.create({
      data: {
        name: data.name,
        description: data.description,
        status: data.status,
        startDate: data.startDate ? new Date(data.startDate) : null,
        endDate: data.endDate ? new Date(data.endDate) : null,
        techStack: data.techStack ?? [],
        members: data.members ?? [],
      },
    });
  }

  remove(id: string) {
    return this.prisma.project.delete({ where: { id } });
  }
}