import { PrismaClient } from '@prisma/client';
const p = new PrismaClient();
const id = '521f5063-a730-4d71-b924-6c8ee41732c0';
const url = 'https://res.cloudinary.com/dhhtwatmk/image/upload/v1782764072/logo_pnbzwz.png';
p.initiative.update({ where: { id }, data: { imageUrl: url } }).then(r => {
  console.log('Updated:', r.title, '->', r.imageUrl);
}).finally(() => p.$disconnect());
