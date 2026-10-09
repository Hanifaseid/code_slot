import type { Request, Response, NextFunction } from 'express';
import { getHealthStatus } from './health.service.js';

export async function healthCheckController(
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const { health, httpStatus } = await getHealthStatus();
    res.status(httpStatus).json(health);
  } catch (error) {
    next(error);
  }
}
