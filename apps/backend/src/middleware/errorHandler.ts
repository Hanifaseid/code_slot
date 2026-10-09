import type { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import { AppError } from '../common/errors.js';
import { sendError } from '../common/response.js';
import { logger } from '../utils/logger.js';
import { config } from '../config/index.js';

export function errorHandler(
  err: Error,
  _req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _next: NextFunction
): void {
  // Handle Zod Validation Errors
  if (err instanceof ZodError) {
    logger.warn({ issues: err.issues }, 'Schema validation error');
    sendError(res, 'Validation failed', 400, 'VALIDATION_ERROR', err.flatten());
    return;
  }

  // Handle Operational App Errors
  if (err instanceof AppError) {
    if (!err.isOperational) {
      logger.error({ err }, 'Non-operational AppError occurred');
    }
    sendError(res, err.message, err.statusCode, err.code);
    return;
  }

  // Handle Bad JSON parsing errors
  if (err instanceof SyntaxError && 'status' in err && err.status === 400) {
    sendError(res, 'Malformed JSON payload', 400, 'BAD_REQUEST');
    return;
  }

  // Handle Unexpected Internal Errors
  logger.error({ err }, 'Unexpected server error');
  const message = config.isProduction ? 'Internal server error' : err.message;
  sendError(res, message, 500, 'INTERNAL_SERVER_ERROR');
}
