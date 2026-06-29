import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class AboutUsService {
  constructor(@Inject(PrismaService) private prisma: PrismaService) {}

  async getAboutUs() {
    const record = await this.prisma.aboutUs.findFirst({
      orderBy: { createdAt: 'desc' }
    });
    return record || { title: 'Our Roots & Mission', subtitle: '', content: '' };
  }

  async findOne(id: string) {
    const record = await this.prisma.aboutUs.findUnique({ where: { id } });
    if (!record) throw new NotFoundException(`AboutUs ${id} not found`);
    return record;
  }

  async update(id: string, data: { title?: string; subtitle?: string; content?: string; imageUrl?: string }) {
    await this.findOne(id);
    return this.prisma.aboutUs.update({ where: { id }, data });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.aboutUs.delete({ where: { id } });
  }
}
