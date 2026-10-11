import { z } from 'zod';
import {
  UserStatusSchema,
  ApplicationStageSchema,
  ActivityCategorySchema,
  ActivityTypeSchema,
  EventSeveritySchema,
  AdminStatsSchema,
  UserActivityEventSchema,
  ManagedUserSchema,
  JobApplicationSchema,
  AIStudioSessionRecordSchema,
  AdminAuditEntrySchema,
} from '@code-slot/shared';

export const UpdateUserStatusSchema = z.object({
  status: UserStatusSchema,
});

export const UpdateApplicationStageSchema = z.object({
  stage: ApplicationStageSchema,
});

export const LogActivitySchema = z.object({
  userId: z.string().optional().default('usr-anonymous'),
  userName: z.string().optional().default('Candidate User'),
  userEmail: z.string().optional().default('user@codeslot.dev'),
  userAvatar: z.string().optional(),
  userRole: z.string().optional().default('candidate'),
  type: ActivityTypeSchema,
  category: ActivityCategorySchema,
  action: z.string(),
  details: z.string(),
  ip: z.string().optional().default('127.0.0.1'),
  location: z.string().optional().default('Worldwide'),
  device: z.string().optional().default('Desktop'),
  browser: z.string().optional().default('Chrome 130'),
  severity: EventSeveritySchema.default('info'),
  metadata: z.record(z.any()).optional(),
});

export {
  AdminStatsSchema,
  UserActivityEventSchema,
  ManagedUserSchema,
  JobApplicationSchema,
  AIStudioSessionRecordSchema,
  AdminAuditEntrySchema,
};
