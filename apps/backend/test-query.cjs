const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  try {
    await prisma.$connect();
    console.log('Connected');
    const initiatives = await prisma.initiative.findMany();
    console.log('Initiatives:', JSON.stringify(initiatives));
    const fieldLogs = await prisma.fieldLog.findMany();
    console.log('FieldLogs:', JSON.stringify(fieldLogs));
    const aboutUs = await prisma.aboutUs.findFirst();
    console.log('AboutUs:', JSON.stringify(aboutUs));
  } catch (e) {
    console.error('ERROR:', e.message);
    console.error('STACK:', e.stack);
  } finally {
    await prisma.$disconnect();
  }
}

main();
