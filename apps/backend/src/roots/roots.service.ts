import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class RootsService {
  constructor(@Inject(PrismaService) private prisma: PrismaService) {}

  async getRoots() {
    const records = await this.prisma.rootsEntry.findMany({
      orderBy: { order: 'asc' }
    });

    if (records.length === 0) {
      return this.getDefaultSections();
    }

    return records;
  }

  async getRootsBySection(section: string) {
    const record = await this.prisma.rootsEntry.findUnique({
      where: { section }
    });
    return record || this.getDefaultSection(section);
  }

  async update(id: string, data: { title?: string; description?: string; videoTitle?: string; youtubeId?: string; imageUrls?: string }) {
    const record = await this.prisma.rootsEntry.findUnique({ where: { id } });
    if (!record) throw new NotFoundException(`RootsEntry ${id} not found`);
    return this.prisma.rootsEntry.update({ where: { id }, data });
  }

  async updateBySection(section: string, data: { title?: string; description?: string; videoTitle?: string; youtubeId?: string; imageUrls?: string }) {
    const record = await this.prisma.rootsEntry.findUnique({ where: { section } });
    if (!record) throw new NotFoundException(`RootsEntry with section "${section}" not found`);
    return this.prisma.rootsEntry.update({ where: { section }, data });
  }

  private getDefaultSections() {
    return [
      {
        id: 'default-build',
        section: 'build',
        order: 0,
        title: 'Built with our hands, ground to roof.',
        description: "We don't design solutions on paper — we execute them. This is the permanent archive of our community school's full construction timeline — from first stone to final beam.",
        videoTitle: 'School build, A to Z',
        youtubeId: null,
        imageUrls: '[]',
      },
      {
        id: 'default-transformation',
        section: 'transformation',
        order: 1,
        title: 'From construction to classroom',
        description: 'We laid the foundation not just in soil, but in hope. Today, children sit where we dreamed. They fill it with life.',
        videoTitle: '',
        youtubeId: null,
        imageUrls: '[]',
      },
      {
        id: 'default-computer-lab',
        section: 'computer-lab',
        order: 2,
        title: 'Building the computer lab, component by component.',
        description: "No lab exists yet — we're building one from scratch. Local machines, hand-built benches, wired by our own hands.",
        videoTitle: 'Computer lab build, from scratch',
        youtubeId: null,
        imageUrls: '[]',
      },
      {
        id: 'default-children-lab',
        section: 'children-lab',
        order: 3,
        title: 'The children now inside the laboratory learning.',
        description: 'Where there was nothing, now there are fingers on keyboards and eyes on screens.',
        videoTitle: '',
        youtubeId: null,
        imageUrls: '[]',
      },
    ];
  }

  private getDefaultSection(section: string) {
    const defaults = this.getDefaultSections();
    return defaults.find(d => d.section === section) || null;
  }
}
