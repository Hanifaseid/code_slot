import { Router } from 'express';
import { authController } from './auth.controller.js';
import {
  RegisterRequestSchema,
  LoginRequestSchema,
  DemoLoginRequestSchema,
  UpdateProfileRequestSchema,
} from './auth.schema.js';
import { validateRequest, requireAuth } from '../../middleware/index.js';
import { registry } from '../../docs/swagger.js';
import { AuthResponseSchema } from '@code-slot/shared';

export const authRouter = Router();

// Register OpenAPI Documentation
const AuthDocSchema = registry.register('AuthResponse', AuthResponseSchema);

registry.registerPath({
  method: 'post',
  path: '/api/auth/register',
  summary: 'Register a new user account',
  request: {
    body: {
      content: {
        'application/json': {
          schema: RegisterRequestSchema,
        },
      },
    },
  },
  responses: {
    201: {
      description: 'Account created successfully',
      content: { 'application/json': { schema: AuthDocSchema } },
    },
    400: { description: 'Validation failed or account exists' },
  },
});

registry.registerPath({
  method: 'post',
  path: '/api/auth/login',
  summary: 'Authenticate existing user',
  request: {
    body: {
      content: {
        'application/json': {
          schema: LoginRequestSchema,
        },
      },
    },
  },
  responses: {
    200: {
      description: 'Authenticated successfully',
      content: { 'application/json': { schema: AuthDocSchema } },
    },
    400: { description: 'Invalid email or credentials' },
  },
});

registry.registerPath({
  method: 'get',
  path: '/api/auth/me',
  summary: 'Get current authenticated user profile',
  security: [{ bearerAuth: [] }],
  responses: {
    200: { description: 'Current user profile' },
    401: { description: 'Unauthorized' },
  },
});

// Routes definition
authRouter.post(
  '/register',
  validateRequest({ body: RegisterRequestSchema }),
  authController.register
);

authRouter.post(
  '/login',
  validateRequest({ body: LoginRequestSchema }),
  authController.login
);

authRouter.get(
  '/me',
  requireAuth,
  authController.getMe
);

authRouter.patch(
  '/profile',
  requireAuth,
  validateRequest({ body: UpdateProfileRequestSchema }),
  authController.updateProfile
);

authRouter.post(
  '/logout',
  authController.logout
);

export default authRouter;
