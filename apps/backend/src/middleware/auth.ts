import type { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/security.js';
import { sendError } from '../common/response.js';

export interface AuthenticatedUser {
  userId: string;
  email: string;
  role: string;
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      user?: AuthenticatedUser;
    }
  }
}

/**
 * Middleware requiring a valid JWT token
 */
export function requireAuth(req: Request, res: Response, next: NextFunction): void {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    sendError(res, 'Authentication required. Missing or invalid Bearer token', 401, 'UNAUTHORIZED');
    return;
  }

  const token = authHeader.substring(7);
  const payload = verifyToken(token);

  if (!payload) {
    sendError(res, 'Invalid or expired authentication token', 401, 'TOKEN_EXPIRED');
    return;
  }

  req.user = {
    userId: payload.userId,
    email: payload.email,
    role: payload.role,
  };

  next();
}

/**
 * Optional authentication middleware: attaches user if token is valid, but allows unauthenticated requests
 */
export function optionalAuth(req: Request, _res: Response, next: NextFunction): void {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.substring(7);
    const payload = verifyToken(token);
    if (payload) {
      req.user = {
        userId: payload.userId,
        email: payload.email,
        role: payload.role,
      };
    }
  }
  next();
}

/**
 * Middleware requiring specific role(s) (e.g. 'admin')
 */
export function requireRole(...allowedRoles: string[]) {
  return (req: Request, res: Response, next: NextFunction): void => {
    if (!req.user) {
      sendError(res, 'Authentication required', 401, 'UNAUTHORIZED');
      return;
    }

    if (!allowedRoles.includes(req.user.role)) {
      sendError(
        res,
        `Forbidden: Access requires one of the following roles: ${allowedRoles.join(', ')}`,
        403,
        'FORBIDDEN'
      );
      return;
    }

    next();
  };
}
