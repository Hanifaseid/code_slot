import { Router } from 'express';
import { resumeController } from './resume.controller.js';
import {
  AITailorRequestSchema,
  AIBulletEnhanceRequestSchema,
  SaveResumeRequestSchema,
} from './resume.schema.js';
import { validateRequest, requireAuth, optionalAuth } from '../../middleware/index.js';
import { registry } from '../../docs/swagger.js';
import {
  AITailorResultSchema,
  AIBulletEnhanceResponseSchema,
} from '@code-slot/shared';

export const resumeRouter = Router();

// Register OpenAPI schemas
const AITailorResultDocSchema = registry.register(
  'AITailorResult',
  AITailorResultSchema
);
const AIBulletEnhanceDocSchema = registry.register(
  'AIBulletEnhanceResponse',
  AIBulletEnhanceResponseSchema
);

// OpenAPI path definitions
registry.registerPath({
  method: 'post',
  path: '/api/resume/tailor',
  summary: 'Tailor resume against job description using Gemini 2.5 Flash',
  request: {
    body: {
      content: {
        'application/json': {
          schema: AITailorRequestSchema,
        },
      },
    },
  },
  responses: {
    200: {
      description: 'AI Tailored resume with ATS match analysis',
      content: { 'application/json': { schema: AITailorResultDocSchema } },
    },
  },
});

registry.registerPath({
  method: 'post',
  path: '/api/resume/enhance-bullet',
  summary: 'Enhance resume bullet point using Google X-Y-Z formula',
  request: {
    body: {
      content: {
        'application/json': {
          schema: AIBulletEnhanceRequestSchema,
        },
      },
    },
  },
  responses: {
    200: {
      description: 'Rewritten high-impact bullet point',
      content: { 'application/json': { schema: AIBulletEnhanceDocSchema } },
    },
  },
});

registry.registerPath({
  method: 'post',
  path: '/api/resume/save',
  summary: 'Save or update resume document for authenticated user',
  security: [{ bearerAuth: [] }],
  request: {
    body: {
      content: {
        'application/json': {
          schema: SaveResumeRequestSchema,
        },
      },
    },
  },
  responses: {
    201: { description: 'Resume saved successfully' },
  },
});

registry.registerPath({
  method: 'get',
  path: '/api/resume/mine',
  summary: 'Get all saved resumes for the current authenticated user',
  security: [{ bearerAuth: [] }],
  responses: {
    200: { description: 'User resume documents' },
  },
});

// Routes definition
resumeRouter.post(
  '/tailor',
  optionalAuth,
  validateRequest({ body: AITailorRequestSchema }),
  resumeController.tailorResume
);

resumeRouter.post(
  '/enhance-bullet',
  optionalAuth,
  validateRequest({ body: AIBulletEnhanceRequestSchema }),
  resumeController.enhanceBullet
);

resumeRouter.post(
  '/save',
  requireAuth,
  validateRequest({ body: SaveResumeRequestSchema }),
  resumeController.saveResume
);

resumeRouter.get(
  '/mine',
  requireAuth,
  resumeController.getUserResumes
);

export default resumeRouter;
