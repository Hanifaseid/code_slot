import express, { type Express } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { config } from './config/index.js';
import { requestLogger, errorHandler } from './middleware/index.js';
import { setupSwagger } from './docs/swagger.js';
import { apiRouter } from './modules/index.js';
import { healthRouter } from './modules/health/health.routes.js';
import { NotFoundError } from './common/errors.js';

export function createApp(): Express {
  const app = express();

  // Security Middleware
  app.use(
    helmet({
      contentSecurityPolicy: config.isProduction ? undefined : false,
    })
  );

  // CORS Configuration
  app.use(
    cors({
      origin: config.server.corsOrigin === '*' ? '*' : [config.server.corsOrigin, 'http://localhost:3000'],
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    })
  );

  // Body Parsing Middleware
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // HTTP Request Logging
  app.use(requestLogger);

  // Setup Swagger OpenAPI Documentation
  setupSwagger(app);

  // Root Liveness Healthcheck (for container engines / Docker Compose)
  app.use('/health', healthRouter);

  // API Routes
  app.use(config.server.apiPrefix, apiRouter);

  // 404 Catch-All Handler
  app.use((_req, _res, next) => {
    next(new NotFoundError('The requested endpoint was not found on this server'));
  });

  // Global Error Handling Middleware
  app.use(errorHandler);

  return app;
}

export const app = createApp();
export default app;
