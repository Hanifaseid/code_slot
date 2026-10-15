import type { Request, Response, NextFunction } from 'express';
import { jobsService } from './jobs.service.js';
import { sendSuccess } from '../../common/response.js';
import { BadRequestError } from '../../common/errors.js';
import type { JobQueryParams } from '@code-slot/shared';

export class JobsController {
  async listJobs(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const queryParams = req.query as unknown as JobQueryParams;
      const result = await jobsService.listJobs(queryParams);
      sendSuccess(res, result, 200);
    } catch (error) {
      next(error);
    }
  }

  async getJobById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const job = await jobsService.getJobById(id);
      sendSuccess(res, job, 200);
    } catch (error) {
      next(error);
    }
  }

  async createJob(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const job = await jobsService.createJob(req.body);
      sendSuccess(res, job, 201);
    } catch (error) {
      next(error);
    }
  }

  async toggleSaveJob(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = req.user?.userId;
      if (!userId) {
        throw new BadRequestError('User context required to save jobs');
      }
      const { id } = req.params;
      const result = await jobsService.toggleSaveJob(userId, id);
      sendSuccess(res, result, 200);
    } catch (error) {
      next(error);
    }
  }

  async getSavedJobs(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = req.user?.userId;
      if (!userId) {
        throw new BadRequestError('User context required');
      }
      const savedJobs = await jobsService.getSavedJobs(userId);
      sendSuccess(res, savedJobs, 200);
    } catch (error) {
      next(error);
    }
  }

  async applyJob(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = req.user?.userId;
      if (!userId) {
        throw new BadRequestError('User context required to apply');
      }
      const targetJobId = req.params.id || req.body.jobId;
      const application = await jobsService.applyJob(userId, {
        ...req.body,
        jobId: targetJobId,
      });
      sendSuccess(res, application, 201);
    } catch (error) {
      next(error);
    }
  }

  async getUserApplications(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = req.user?.userId;
      if (!userId) {
        throw new BadRequestError('User context required');
      }
      const applications = await jobsService.getUserApplications(userId);
      sendSuccess(res, applications, 200);
    } catch (error) {
      next(error);
    }
  }

  async deleteJob(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const deleted = await jobsService.deleteJob(id);
      sendSuccess(res, { deleted, id }, 200);
    } catch (error) {
      next(error);
    }
  }
}

export const jobsController = new JobsController();
