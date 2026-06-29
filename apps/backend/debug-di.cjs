// Test PrismaClient instantiation
const { PrismaClient } = require('@prisma/client');
try {
  const p = new PrismaClient();
  console.log('PrismaClient instantiated OK');
  console.log('Constructor exists:', typeof p.$connect === 'function');
} catch(e) {
  console.error('PrismaClient failed:', e.message);
}

// Test with required dotenv
require('dotenv').config({ path: '../../.env' });
console.log('DATABASE_URL exists:', !!process.env.DATABASE_URL);
try {
  const p2 = new PrismaClient({ log: ['error', 'warn'] });
  console.log('PrismaClient with env OK');
} catch(e) {
  console.error('PrismaClient with env failed:', e.message);
}
