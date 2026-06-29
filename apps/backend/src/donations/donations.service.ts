import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class DonationsService {
  constructor(@Inject(PrismaService) private prisma: PrismaService) {}

  async create(data: { amount: number; donorName: string; projectId?: string }) {
    return this.prisma.donation.create({ data });
  }

  async findAll() {
    return this.prisma.donation.findMany({
      orderBy: { date: 'desc' }
    });
  }

  async findOne(id: string) {
    const record = await this.prisma.donation.findUnique({ where: { id } });
    if (!record) throw new NotFoundException(`Donation ${id} not found`);
    return record;
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.donation.delete({ where: { id } });
  }
}
