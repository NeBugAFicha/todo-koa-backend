import { Prisma, PrismaClient } from '@prisma/client';
import { env } from 'process';

const sqlLogging = ['query', 'info', 'warn'];

export default new PrismaClient({
  log: ['error', ...(process.env.NODE_ENV === 'development' ? <any>sqlLogging : [])],
});
