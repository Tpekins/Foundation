import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class RootsService {
  constructor(@Inject(PrismaService) private prisma: PrismaService) {}

  async getRoots() {
    const record = await this.prisma.rootsEntry.findFirst({
      orderBy: { createdAt: 'desc' }
    });
    return record || {
      title: 'Built with our hands, ground to roof.',
      description: "We don't design solutions on paper  we execute them. This is the permanent archive of our community school's full construction timeline  from first stone to final beam.",
      videoTitle: 'School build, A to Z',
      youtubeId: null,
      imageUrls: '[]',
    };
  }

  async update(id: string, data: { title?: string; description?: string; videoTitle?: string; youtubeId?: string; imageUrls?: string }) {
    const record = await this.prisma.rootsEntry.findUnique({ where: { id } });
    if (!record) throw new NotFoundException(`RootsEntry ${id} not found`);
    return this.prisma.rootsEntry.update({ where: { id }, data });
  }
}
