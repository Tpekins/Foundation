import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  try {
    await prisma.$connect();
    console.log('Connected');
    const initiatives = await prisma.initiative.findMany();
    console.log('Initiatives:', JSON.stringify(initiatives, null, 2));
    const fieldLogs = await prisma.fieldLog.findMany();
    console.log('FieldLogs:', JSON.stringify(fieldLogs, null, 2));
    const aboutUs = await prisma.aboutUs.findFirst();
    console.log('AboutUs:', JSON.stringify(aboutUs, null, 2));
  } catch (e) {
    console.error('ERROR:', e);
  } finally {
    await prisma.$disconnect();
  }
}

main();
