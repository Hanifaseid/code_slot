import {
  JobSchema,
  JobQuerySchema,
  CreateJobRequestSchema,
  ApplyJobRequestSchema,
} from '@code-slot/shared';
import { z } from 'zod';

export const SaveJobParamsSchema = z.object({
  id: z.string(),
});

export const ApplyJobParamsSchema = z.object({
  id: z.string(),
});

export { JobSchema, JobQuerySchema, CreateJobRequestSchema, ApplyJobRequestSchema };
