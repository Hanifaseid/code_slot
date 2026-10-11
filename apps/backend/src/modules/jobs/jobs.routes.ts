import { Router } from 'express';
import { jobsController } from './jobs.controller.js';
import {
  JobQuerySchema,
  CreateJobRequestSchema,
  ApplyJobRequestSchema,
  SaveJobParamsSchema,
} from './jobs.schema.js';
import { validateRequest, requireAuth, optionalAuth } from '../../middleware/index.js';
import { registry } from '../../docs/swagger.js';
import {
  JobSchema,
  JobPaginatedResponseSchema,
  JobApplicationSchema,
} from '@code-slot/shared';

export const jobsRouter = Router();

// Register OpenAPI schemas
const JobDocSchema = registry.register('Job', JobSchema);
const JobPaginatedDocSchema = registry.register(
  'JobPaginatedResponse',
  JobPaginatedResponseSchema
);
const JobApplicationDocSchema = registry.register(
  'JobApplication',
  JobApplicationSchema
);

// OpenAPI route definitions
registry.registerPath({
  method: 'get',
  path: '/api/jobs',
  summary: 'Search, filter, and paginate remote tech jobs',
  parameters: [
    { name: 'search', in: 'query', schema: { type: 'string' } },
    { name: 'category', in: 'query', schema: { type: 'string' } },
    { name: 'location', in: 'query', schema: { type: 'string' } },
    { name: 'page', in: 'query', schema: { type: 'integer', default: 1 } },
    { name: 'limit', in: 'query', schema: { type: 'integer', default: 20 } },
  ],
  responses: {
    200: {
      description: 'Paginated list of jobs',
      content: { 'application/json': { schema: JobPaginatedDocSchema } },
    },
  },
});

registry.registerPath({
  method: 'get',
  path: '/api/jobs/{id}',
  summary: 'Get details of a specific job posting',
  parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
  responses: {
    200: {
      description: 'Job details',
      content: { 'application/json': { schema: JobDocSchema } },
    },
    404: { description: 'Job not found' },
  },
});

registry.registerPath({
  method: 'post',
  path: '/api/jobs',
  summary: 'Post a new tech job listing',
  request: {
    body: {
      content: { 'application/json': { schema: CreateJobRequestSchema } },
    },
  },
  responses: {
    201: {
      description: 'Job posted successfully',
      content: { 'application/json': { schema: JobDocSchema } },
    },
  },
});

registry.registerPath({
  method: 'post',
  path: '/api/jobs/{id}/save',
  summary: 'Bookmark or un-bookmark a job for authenticated candidate',
  security: [{ bearerAuth: [] }],
  parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
  responses: {
    200: { description: 'Toggle bookmark status' },
  },
});

registry.registerPath({
  method: 'post',
  path: '/api/jobs/{id}/apply',
  summary: 'Submit a job application with tailored resume match score',
  security: [{ bearerAuth: [] }],
  parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
  request: {
    body: {
      content: { 'application/json': { schema: ApplyJobRequestSchema } },
    },
  },
  responses: {
    201: {
      description: 'Application submitted',
      content: { 'application/json': { schema: JobApplicationDocSchema } },
    },
  },
});

// Routes
jobsRouter.get(
  '/',
  validateRequest({ query: JobQuerySchema }),
  jobsController.listJobs
);

jobsRouter.get('/saved', requireAuth, jobsController.getSavedJobs);

jobsRouter.get('/applications', requireAuth, jobsController.getUserApplications);

jobsRouter.get('/:id', jobsController.getJobById);

jobsRouter.post(
  '/',
  optionalAuth,
  validateRequest({ body: CreateJobRequestSchema }),
  jobsController.createJob
);

jobsRouter.post(
  '/:id/save',
  requireAuth,
  validateRequest({ params: SaveJobParamsSchema }),
  jobsController.toggleSaveJob
);

jobsRouter.post(
  '/:id/apply',
  requireAuth,
  validateRequest({ params: SaveJobParamsSchema, body: ApplyJobRequestSchema }),
  jobsController.applyJob
);

export default jobsRouter;
