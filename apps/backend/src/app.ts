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
      contentSecurityPolicy: false,
      crossOriginResourcePolicy: { policy: 'cross-origin' },
      crossOriginOpenerPolicy: false,
    })
  );

  // CORS Configuration - Permissive for seamless operation on localhost and Vercel
  const corsOptions: cors.CorsOptions = {
    origin: (origin, callback) => {
      // Allow requests with no origin (e.g. mobile apps, curl, server-to-server)
      if (!origin) return callback(null, true);

      // Allow any localhost / 127.0.0.1 port
      if (
        origin.startsWith('http://localhost:') ||
        origin.startsWith('https://localhost:') ||
        origin.startsWith('http://127.0.0.1:') ||
        origin.startsWith('https://127.0.0.1:')
      ) {
        return callback(null, true);
      }

      // Allow any Vercel domain (*.vercel.app)
      if (origin.endsWith('.vercel.app') || origin === 'https://codeslot-nine.vercel.app') {
        return callback(null, true);
      }

      // Allow configured CORS origin
      if (
        config.server.corsOrigin === '*' ||
        origin === config.server.corsOrigin
      ) {
        return callback(null, true);
      }

      // Allow all origins in production deployment
      return callback(null, true);
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: [
      'Content-Type',
      'Authorization',
      'X-Requested-With',
      'Accept',
      'Origin',
    ],
    exposedHeaders: ['Authorization'],
  };

  app.use(cors(corsOptions));
  app.options('*', cors(corsOptions));

  // Body Parsing Middleware
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // HTTP Request Logging
  app.use(requestLogger);

  // Setup Swagger OpenAPI Documentation
  setupSwagger(app);

  // Root Liveness Healthcheck (for container engines / Docker Compose)
  app.use('/health', healthRouter);

  // API Routes - mounted on both config.server.apiPrefix ('/api') and root ('/')
  // to ensure routes match whether invoked directly or rewritten by Vercel serverless
  app.use(config.server.apiPrefix, apiRouter);
  if (config.server.apiPrefix !== '/') {
    app.use('/', apiRouter);
  }

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
