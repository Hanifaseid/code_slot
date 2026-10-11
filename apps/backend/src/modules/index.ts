import { Router } from 'express';
import { healthRouter } from './health/health.routes.js';
import { authRouter } from './auth/auth.routes.js';
import { jobsRouter } from './jobs/jobs.routes.js';
import { resumeRouter } from './resume/resume.routes.js';
import { adminRouter } from './admin/admin.routes.js';

export const apiRouter = Router();

// Infrastructure health routes
apiRouter.use('/health', healthRouter);

// Authentication & Users
apiRouter.use('/auth', authRouter);

// Remote Tech Job Board
apiRouter.use('/jobs', jobsRouter);

// AI Resume Studio & Optimization
apiRouter.use('/resume', resumeRouter);

// Admin Control Plane & Analytics
apiRouter.use('/admin', adminRouter);

export default apiRouter;
