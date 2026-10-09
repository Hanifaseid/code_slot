import { z } from 'zod';

/**
 * Standard API Response envelope
 */
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: {
    message: string;
    code?: string;
    details?: unknown;
  };
  meta?: Record<string, unknown>;
}

/**
 * Health check status schema and type
 */
export const HealthStatusSchema = z.object({
  status: z.enum(['ok', 'degraded', 'error']),
  uptime: z.number(),
  timestamp: z.string(),
  service: z.string(),
  version: z.string(),
  database: z.enum(['connected', 'disconnected', 'unknown']),
  memory: z
    .object({
      usedMb: z.number(),
      totalMb: z.number(),
    })
    .optional(),
});

export type HealthStatus = z.infer<typeof HealthStatusSchema>;

/**
 * Environment schema for frontend and backend configuration validation
 */
export const EnvironmentModeSchema = z.enum(['development', 'test', 'production']);
export type EnvironmentMode = z.infer<typeof EnvironmentModeSchema>;

/**
 * Standard pagination query parameters
 */
export const PaginationParamsSchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
  sortBy: z.string().optional(),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
});

export type PaginationParams = z.infer<typeof PaginationParamsSchema>;
