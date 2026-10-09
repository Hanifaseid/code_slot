import { pinoHttp } from 'pino-http';
import { logger } from '../utils/logger.js';

export const requestLogger = pinoHttp({
  logger,
  autoLogging: {
    ignore: (req) => {
      const url = req.url ?? '';
      return url.includes('/health') || url.includes('/docs');
    },
  },
  customLogLevel: (_req, res, err) => {
    if (res.statusCode >= 500 || err) return 'error';
    if (res.statusCode >= 400) return 'warn';
    return 'info';
  },
});
