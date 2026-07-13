import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const aboutUs = await prisma.aboutUs.upsert({
    where: { id: 'seed-default-about' },
    update: {},
    create: {
      id: 'seed-default-about',
      title: 'Our Roots & Mission',
      content: 'Tianipekins.org Foundation is a grassroots engineering foundation based in Buea, Cameroon. We work across digital literacy, moral education, agriculture, and community care - engineering the offline hardware that runs underneath it all.',
    },
  });

  const initiatives = await prisma.initiative.createMany({
    data: [
      {
        title: 'Smart Infrastructure Lab',
        description: 'A lab focused on building smart, scalable solutions for local communities.',
        status: 'Active - incubated, not owned',
        link: 'https://smartlab.africa',
        isPublished: true,
      },
      {
        title: 'Local Hands',
        description: 'Connecting local artisans directly with clients.',
        status: 'Active - incubated, not owned',
        link: 'https://localhands.africa',
        isPublished: true,
      },
    ],
    skipDuplicates: true,
  });

  const fieldLogs = await prisma.fieldLog.createMany({
    data: [
      {
        type: 'FIELD_LOG',
        category: 'Donation',
        title: "Books and shoes delivered to St. Mary's Orphanage",
        content: 'A small drop-off of school books and shoes ahead of the new term.',
        imageUrls: '[]',
        eventDate: new Date('2026-06-15T00:00:00Z'),
        isPublished: true,
      },
    ],
    skipDuplicates: true,
  });

  console.log('Seed data inserted:', { aboutUs, initiatives, fieldLogs });
}

main()
  .catch((e) => {
    console.error('Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
