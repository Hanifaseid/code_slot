import type { HealthStatus } from '@code-slot/shared';
import { checkDatabaseConnection } from '../../database/client.js';

export async function getHealthStatus(): Promise<{
  health: HealthStatus;
  httpStatus: number;
}> {
  const dbCheck = await checkDatabaseConnection();
  const isHealthy = dbCheck.connected;
  const memoryUsage = process.memoryUsage();

  const health: HealthStatus = {
    status: isHealthy ? 'ok' : 'degraded',
    uptime: Math.floor(process.uptime()),
    timestamp: new Date().toISOString(),
    service: 'codeslot-backend',
    version: '0.1.0',
    database: isHealthy ? 'connected' : 'disconnected',
    memory: {
      usedMb: Math.round(memoryUsage.heapUsed / 1024 / 1024),
      totalMb: Math.round(memoryUsage.heapTotal / 1024 / 1024),
    },
  };

  return {
    health,
    // Return 200 even if DB is still starting up for container liveness, but report degraded
    httpStatus: 200,
  };
}
