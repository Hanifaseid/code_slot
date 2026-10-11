import {
  ResumeDataSchema,
  ResumeSettingsSchema,
  AITailorRequestSchema,
  AITailorResultSchema,
  AIBulletEnhanceRequestSchema,
  AIBulletEnhanceResponseSchema,
} from '@code-slot/shared';
import { z } from 'zod';

export const SaveResumeRequestSchema = z.object({
  title: z.string().optional().default('My Tech Resume'),
  templateId: z.string().optional().default('ats-compact'),
  accentColor: z.string().optional().default('slate'),
  density: z.string().optional().default('standard'),
  paperSize: z.string().optional().default('a4'),
  content: ResumeDataSchema,
  atsScore: z.number().optional().default(75),
});
export type SaveResumeRequest = z.infer<typeof SaveResumeRequestSchema>;

export {
  ResumeDataSchema,
  ResumeSettingsSchema,
  AITailorRequestSchema,
  AITailorResultSchema,
  AIBulletEnhanceRequestSchema,
  AIBulletEnhanceResponseSchema,
};
