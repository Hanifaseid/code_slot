import type { Request, Response, NextFunction } from 'express';
import { resumeService } from './resume.service.js';
import { sendSuccess } from '../../common/response.js';
import { BadRequestError } from '../../common/errors.js';

export class ResumeController {
  async tailorResume(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = req.user?.userId;
      const result = await resumeService.tailorResume(req.body, userId);
      sendSuccess(res, result, 200);
    } catch (error) {
      next(error);
    }
  }

  async enhanceBullet(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = await resumeService.enhanceBullet(req.body);
      sendSuccess(res, result, 200);
    } catch (error) {
      next(error);
    }
  }

  async saveResume(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = req.user?.userId;
      if (!userId) {
        throw new BadRequestError('User context required to save resumes');
      }
      const saved = await resumeService.saveResume(userId, req.body);
      sendSuccess(res, saved, 201);
    } catch (error) {
      next(error);
    }
  }

  async getUserResumes(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = req.user?.userId;
      if (!userId) {
        throw new BadRequestError('User context required');
      }
      const resumes = await resumeService.getUserResumes(userId);
      sendSuccess(res, resumes, 200);
    } catch (error) {
      next(error);
    }
  }
}

export const resumeController = new ResumeController();
