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

  async getResumeById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = req.user?.userId;
      if (!userId) {
        throw new BadRequestError('User context required');
      }
      const { id } = req.params;
      const resume = await resumeService.getResumeById(userId, id);
      if (!resume) {
        throw new BadRequestError('Resume not found');
      }
      sendSuccess(res, resume, 200);
    } catch (error) {
      next(error);
    }
  }

  async deleteResume(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = req.user?.userId;
      if (!userId) {
        throw new BadRequestError('User context required');
      }
      const { id } = req.params;
      const deleted = await resumeService.deleteResume(userId, id);
      sendSuccess(res, { deleted, id }, 200);
    } catch (error) {
      next(error);
    }
  }
}

export const resumeController = new ResumeController();
