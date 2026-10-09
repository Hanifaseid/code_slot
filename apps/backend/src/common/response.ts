import type { Response } from 'express';
import type { ApiResponse } from '@code-slot/shared';

/**
 * Standard HTTP success responder
 */
export function sendSuccess<T>(
  res: Response,
  data: T,
  statusCode = 200,
  meta?: Record<string, unknown>
): Response {
  const response: ApiResponse<T> = {
    success: true,
    data,
    meta,
  };
  return res.status(statusCode).json(response);
}

/**
 * Standard HTTP error responder
 */
export function sendError(
  res: Response,
  message: string,
  statusCode = 500,
  code?: string,
  details?: unknown
): Response {
  const response: ApiResponse<never> = {
    success: false,
    error: {
      message,
      code,
      details,
    },
  };
  return res.status(statusCode).json(response);
}
