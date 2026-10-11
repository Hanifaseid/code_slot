import {
  extendZodWithOpenApi,
  OpenAPIRegistry,
  OpenApiGeneratorV3,
} from '@asteasolutions/zod-to-openapi';
import type { Express } from 'express';
import swaggerUi from 'swagger-ui-express';
import { z } from 'zod';
import { HealthStatusSchema } from '@code-slot/shared';

// Extend Zod with OpenAPI properties
extendZodWithOpenApi(z);

export const registry = new OpenAPIRegistry();

// Register Bearer Authentication Security Scheme
registry.registerComponent('securitySchemes', 'bearerAuth', {
  type: 'http',
  scheme: 'bearer',
  bearerFormat: 'JWT',
  description: 'Enter your JWT token obtained from /api/auth/login or /api/auth/demo-login',
});

// Register Health schema
const HealthDocSchema = registry.register('HealthStatus', HealthStatusSchema);

// Register Health endpoint
registry.registerPath({
  method: 'get',
  path: '/api/health',
  summary: 'System health check',
  description: 'Returns health status of the API and PostgreSQL database connection',
  responses: {
    200: {
      description: 'System is healthy',
      content: {
        'application/json': {
          schema: HealthDocSchema,
        },
      },
    },
    503: {
      description: 'System or database is unhealthy',
      content: {
        'application/json': {
          schema: HealthDocSchema,
        },
      },
    },
  },
});

export function generateOpenApiDocument(): Record<string, any> {
  const generator = new OpenApiGeneratorV3(registry.definitions);
  return generator.generateDocument({
    openapi: '3.0.0',
    info: {
      title: 'CodeSlot Backend API',
      version: '1.0.0',
      description: 'CodeSlot Full-Stack Monorepo Backend API with Express, PostgreSQL & Prisma',
    },
    servers: [
      {
        url: '/',
        description: 'Base server URL',
      },
    ],
  });
}

export function setupSwagger(app: Express): void {
  const openApiDoc = generateOpenApiDocument();
  app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(openApiDoc));
  app.get('/api/docs.json', (_req, res) => {
    res.json(openApiDoc);
  });
}
