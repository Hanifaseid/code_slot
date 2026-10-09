import { PrismaClient } from '@prisma/client';
import { logger } from '../utils/logger.js';

// Global declaration to maintain singleton across hot reloads in development
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log:
      process.env.NODE_ENV === 'development'
        ? ['error', 'warn']
        : ['error'],
  });

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}

/**
 * Checks connectivity to the PostgreSQL database
 */
export async function checkDatabaseConnection(): Promise<{
  connected: boolean;
  latencyMs?: number;
  error?: string;
}> {
  const startTime = Date.now();
  try {
    await prisma.$queryRaw`SELECT 1`;
    const latencyMs = Date.now() - startTime;
    return { connected: true, latencyMs };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown database error';
    logger.warn({ err: message }, 'Database connectivity check failed');
    return { connected: false, error: message };
  }
}

/**
 * Disconnects Prisma client gracefully
 */
export async function disconnectDatabase(): Promise<void> {
  try {
    await prisma.$disconnect();
    logger.info('Database client disconnected gracefully');
  } catch (error) {
    logger.error({ err: error }, 'Error disconnecting from database');
  }
}

export default prisma;
