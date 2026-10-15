import type { Request, Response, NextFunction } from 'express';
import { adminService } from './admin.service.js';
import { sendSuccess } from '../../common/response.js';
import { NotFoundError } from '../../common/errors.js';
import type { UserStatus, ApplicationStage } from '@code-slot/shared';

export class AdminController {
  async getStats(_req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const stats = await adminService.getStats();
      sendSuccess(res, stats, 200);
    } catch (error) {
      next(error);
    }
  }

  async getUsers(_req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const users = await adminService.getUsers();
      sendSuccess(res, users, 200);
    } catch (error) {
      next(error);
    }
  }

  async updateUserStatus(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const { status } = req.body as { status: UserStatus };
      const adminEmail = req.user?.email || 'admin@gmail.com';
      const success = await adminService.updateUserStatus(id, status, adminEmail);
      if (!success) {
        throw new NotFoundError(`User with id '${id}' not found`);
      }
      sendSuccess(res, { success: true, userId: id, status }, 200);
    } catch (error) {
      next(error);
    }
  }

  async getActivities(_req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const activities = await adminService.getActivities();
      sendSuccess(res, activities, 200);
    } catch (error) {
      next(error);
    }
  }

  async logActivity(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const event = await adminService.logActivity(req.body);
      sendSuccess(res, event, 201);
    } catch (error) {
      next(error);
    }
  }

  async getApplications(_req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const applications = await adminService.getApplications();
      sendSuccess(res, applications, 200);
    } catch (error) {
      next(error);
    }
  }

  async updateApplicationStage(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const { stage } = req.body as { stage: ApplicationStage };
      const adminEmail = req.user?.email || 'admin@gmail.com';
      const updated = await adminService.updateApplicationStage(id, stage, adminEmail);
      if (!updated) {
        throw new NotFoundError(`Application with id '${id}' not found`);
      }
      sendSuccess(res, updated, 200);
    } catch (error) {
      next(error);
    }
  }

  async getAISessions(_req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const sessions = await adminService.getAISessions();
      sendSuccess(res, sessions, 200);
    } catch (error) {
      next(error);
    }
  }

  async getAuditLogs(_req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const logs = await adminService.getAuditLogs();
      sendSuccess(res, logs, 200);
    } catch (error) {
      next(error);
    }
  }

  async clearTelemetryCache(_req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = await adminService.clearTelemetryCache();
      sendSuccess(res, result, 200);
    } catch (error) {
      next(error);
    }
  }

  async getBroadcast(_req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const broadcast = adminService.getBroadcastAnnouncement();
      sendSuccess(res, broadcast, 200);
    } catch (error) {
      next(error);
    }
  }

  async setBroadcast(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const broadcast = adminService.setBroadcastAnnouncement(req.body);
      sendSuccess(res, broadcast, 200);
    } catch (error) {
      next(error);
    }
  }
}

export const adminController = new AdminController();
