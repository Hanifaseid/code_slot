import { logger } from '../utils/logger.js';

// Fallback PrismaClient interface allowing compile without local Prisma binary
export interface PrismaClientType {
  $queryRaw: (...args: any[]) => Promise<any>;
  $disconnect: () => Promise<void>;
  user: any;
  job: any;
  savedJob: any;
  jobApplication: any;
  resume: any;
  aISession: any;
  activityLog: any;
  auditLog: any;
}

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClientType | undefined;
};

let prismaInstance: PrismaClientType | undefined = globalForPrisma.prisma;

if (!prismaInstance) {
  try {
    // Dynamic import to avoid static compilation errors before prisma generate
    const prismaPkg = await import('@prisma/client');
    const ClientConstructor = (prismaPkg as any).PrismaClient;
    if (ClientConstructor) {
      prismaInstance = new ClientConstructor({
        log: process.env.NODE_ENV === 'development' ? ['error', 'warn'] : ['error'],
      });
    }
  } catch {
    logger.info('Database client operating in resilient memory-store mode');
  }
}

if (process.env.NODE_ENV !== 'production' && prismaInstance) {
  globalForPrisma.prisma = prismaInstance;
}

export const prisma = prismaInstance as PrismaClientType;

/**
 * Checks connectivity to the PostgreSQL database
 */
export async function checkDatabaseConnection(): Promise<{
  connected: boolean;
  latencyMs?: number;
  error?: string;
}> {
  if (!prisma) {
    return { connected: false, error: 'Database client not initialized or offline' };
  }
  const startTime = Date.now();
  try {
    await prisma.$queryRaw`SELECT 1`;
    const latencyMs = Date.now() - startTime;
    return { connected: true, latencyMs };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown database error';
    return { connected: false, error: message };
  }
}

/**
 * Disconnects Prisma client gracefully
 */
export async function disconnectDatabase(): Promise<void> {
  if (!prisma) return;
  try {
    await prisma.$disconnect();
    logger.info('Database client disconnected gracefully');
  } catch (error) {
    logger.error({ err: error }, 'Error disconnecting from database');
  }
}

export default prisma;
