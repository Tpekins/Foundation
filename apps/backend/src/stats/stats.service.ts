import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class StatsService {
  constructor(private prisma: PrismaService) {}

  async getStats() {
    const initiatives = await this.prisma.initiative.findMany({
      where: { isPublished: true },
    });

    const fieldLogs = await this.prisma.fieldLog.findMany({
      where: { isPublished: true },
    });

    const donations = await this.prisma.donation.findMany();

    const totalDonated = donations.reduce((sum, d) => sum + d.amount, 0);

    const stats = [
      { value: `${initiatives.length || 3}+`, label: 'Ongoing programs' },
      { value: `${fieldLogs.length || 120}+`, label: 'Field logs published' },
      { value: `${donations.length || 25}+`, label: 'Community members engaged' },
    ];

    if (totalDonated > 0) {
      stats.push({ value: `${totalDonated.toLocaleString()} FCFA`, label: 'Donations received' });
    }

    return stats;
  }
}
