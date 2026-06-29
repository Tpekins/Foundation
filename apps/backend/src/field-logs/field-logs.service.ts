import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class FieldLogsService {
  constructor(@Inject(PrismaService) private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.fieldLog.findMany({
      where: { isPublished: true },
      orderBy: { eventDate: 'desc' }
    });
  }

  async findOne(id: string) {
    const record = await this.prisma.fieldLog.findUnique({ where: { id } });
    if (!record) throw new NotFoundException(`FieldLog ${id} not found`);
    return record;
  }

  async update(id: string, data: { title?: string; content?: string; category?: string; metrics?: string; eventDate?: string | Date; isPublished?: boolean }) {
    await this.findOne(id);
    const payload = { ...data };
    if (payload.eventDate && typeof payload.eventDate === 'string') {
      payload.eventDate = new Date(payload.eventDate);
    }
    return this.prisma.fieldLog.update({ where: { id }, data: payload });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.fieldLog.delete({ where: { id } });
  }
}
