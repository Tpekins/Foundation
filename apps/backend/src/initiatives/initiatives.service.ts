import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class InitiativesService {
  constructor(@Inject(PrismaService) private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.initiative.findMany({
      where: { isPublished: true },
      orderBy: { createdAt: 'desc' }
    });
  }

  async findOne(id: string) {
    const record = await this.prisma.initiative.findUnique({ where: { id } });
    if (!record) throw new NotFoundException(`Initiative ${id} not found`);
    return record;
  }

  async create(data: { category?: string; title: string; description: string; status: string; link?: string; imageUrl?: string }) {
    return this.prisma.initiative.create({ data });
  }

  async update(id: string, data: { category?: string; title?: string; description?: string; status?: string; link?: string; imageUrl?: string; isPublished?: boolean }) {
    await this.findOne(id);
    return this.prisma.initiative.update({ where: { id }, data });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.initiative.delete({ where: { id } });
  }
}
