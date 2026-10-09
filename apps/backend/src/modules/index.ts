import { Router } from 'express';
import { healthRouter } from './health/health.routes.js';

export const apiRouter = Router();

// Infrastructure health routes
apiRouter.use('/health', healthRouter);

// Scaffolding note: Feature modules (jobs, resumes, users, auth) will be mounted here in future phases.

export default apiRouter;
