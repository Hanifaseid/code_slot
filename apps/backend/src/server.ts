import { app } from './app.js';
import { config } from './config/index.js';
import { logger } from './utils/logger.js';
import { disconnectDatabase } from './database/client.js';

const server = app.listen(config.server.port, config.server.host, () => {
  logger.info(
    `🚀 Server running in ${config.env} mode at http://${config.server.host}:${config.server.port}`
  );
  logger.info(
    `📑 Swagger API Docs available at http://${config.server.host}:${config.server.port}/api/docs`
  );
  logger.info(
    `❤️  Health check available at http://${config.server.host}:${config.server.port}/health`
  );
});

// Graceful Shutdown Handler
let isShuttingDown = false;

async function handleShutdown(signal: string): Promise<void> {
  if (isShuttingDown) return;
  isShuttingDown = true;

  logger.info(`${signal} signal received: closing HTTP server and database connections...`);

  server.close(async () => {
    logger.info('HTTP server closed');
    await disconnectDatabase();
    logger.info('Graceful shutdown completed');
    process.exit(0);
  });

  // Force close after 10 seconds if graceful shutdown times out
  setTimeout(() => {
    logger.error('Could not close connections in time, forcefully shutting down');
    process.exit(1);
  }, 10000).unref();
}

process.on('SIGTERM', () => void handleShutdown('SIGTERM'));
process.on('SIGINT', () => void handleShutdown('SIGINT'));

export default server;
