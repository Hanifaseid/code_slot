import { Router } from 'express';
import { adminController } from './admin.controller.js';
import {
  UpdateUserStatusSchema,
  UpdateApplicationStageSchema,
  LogActivitySchema,
} from './admin.schema.js';
import {
  validateRequest,
  requireAuth,
  requireRole,
  optionalAuth,
} from '../../middleware/index.js';
import { registry } from '../../docs/swagger.js';
import {
  AdminStatsSchema,
  UserActivityEventSchema,
  ManagedUserSchema,
  JobApplicationSchema,
  AIStudioSessionRecordSchema,
} from '@code-slot/shared';

export const adminRouter = Router();

// Register OpenAPI Documentation
const AdminStatsDocSchema = registry.register('AdminStats', AdminStatsSchema);
const ManagedUserDocSchema = registry.register('ManagedUser', ManagedUserSchema);
const UserActivityDocSchema = registry.register(
  'UserActivityEvent',
  UserActivityEventSchema
);
const AIStudioSessionDocSchema = registry.register(
  'AIStudioSessionRecord',
  AIStudioSessionRecordSchema
);

registry.registerPath({
  method: 'get',
  path: '/api/admin/stats',
  summary: 'Get platform-wide aggregated metrics and KPI statistics',
  security: [{ bearerAuth: [] }],
  responses: {
    200: {
      description: 'System statistics',
      content: { 'application/json': { schema: AdminStatsDocSchema } },
    },
  },
});

registry.registerPath({
  method: 'get',
  path: '/api/admin/users',
  summary: 'List all registered candidates and recruiters',
  security: [{ bearerAuth: [] }],
  responses: {
    200: {
      description: 'List of managed users',
      content: { 'application/json': { schema: ManagedUserDocSchema } },
    },
  },
});

registry.registerPath({
  method: 'get',
  path: '/api/admin/activities',
  summary: 'Stream of real-time platform user activities',
  security: [{ bearerAuth: [] }],
  responses: {
    200: {
      description: 'Activity feed',
      content: { 'application/json': { schema: UserActivityDocSchema } },
    },
  },
});

registry.registerPath({
  method: 'get',
  path: '/api/admin/ai-sessions',
  summary: 'AI Resume Studio sessions with ATS match improvement analytics',
  security: [{ bearerAuth: [] }],
  responses: {
    200: {
      description: 'AI session logs',
      content: { 'application/json': { schema: AIStudioSessionDocSchema } },
    },
  },
});

// Admin endpoints
adminRouter.get('/stats', requireAuth, requireRole('admin'), adminController.getStats);

adminRouter.get('/users', requireAuth, requireRole('admin'), adminController.getUsers);

adminRouter.patch(
  '/users/:id/status',
  requireAuth,
  requireRole('admin'),
  validateRequest({ body: UpdateUserStatusSchema }),
  adminController.updateUserStatus
);

// Activities feed can be viewed by admin, but candidates can also emit events
adminRouter.get(
  '/activities',
  requireAuth,
  requireRole('admin'),
  adminController.getActivities
);

adminRouter.post(
  '/activities',
  optionalAuth,
  validateRequest({ body: LogActivitySchema }),
  adminController.logActivity
);

adminRouter.get(
  '/applications',
  requireAuth,
  requireRole('admin'),
  adminController.getApplications
);

adminRouter.patch(
  '/applications/:id/stage',
  requireAuth,
  requireRole('admin'),
  validateRequest({ body: UpdateApplicationStageSchema }),
  adminController.updateApplicationStage
);

adminRouter.get(
  '/ai-sessions',
  requireAuth,
  requireRole('admin'),
  adminController.getAISessions
);

adminRouter.get(
  '/audit-logs',
  requireAuth,
  requireRole('admin'),
  adminController.getAuditLogs
);

adminRouter.post(
  '/system/clear-cache',
  requireAuth,
  requireRole('admin'),
  adminController.clearTelemetryCache
);

// Global Announcement Banner (GET public, POST admin-only)
adminRouter.get('/broadcast', adminController.getBroadcast);
adminRouter.post(
  '/broadcast',
  requireAuth,
  requireRole('admin'),
  adminController.setBroadcast
);

export default adminRouter;
