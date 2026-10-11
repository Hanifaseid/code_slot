import crypto from 'node:crypto';
import type {
  Job,
  JobQueryParams,
  JobPaginatedResponse,
  CreateJobRequest,
  ApplyJobRequest,
  JobApplication,
} from '@code-slot/shared';
import { prisma, checkDatabaseConnection } from '../../database/client.js';
import { INITIAL_CURATED_JOBS } from './jobs.data.js';
import { NotFoundError } from '../../common/errors.js';
import { logger } from '../../utils/logger.js';
import { authService } from '../auth/auth.service.js';

// In-memory store for jobs
const jobsMap: Map<string, Job> = new Map(
  INITIAL_CURATED_JOBS.map((j) => [j.id, j])
);

// Map of userId -> Set of saved jobId
const userSavedJobsMap: Map<string, Set<string>> = new Map([
  ['usr-alex-02', new Set(['cs-linear-staff-eng', 'cs-stripe-backend-infra'])],
]);

// In-memory applications
const applicationsList: JobApplication[] = [
  {
    id: 'app-init-01',
    userId: 'usr-alex-02',
    userName: 'Alex Mercer',
    userEmail: 'alex.mercer@codeslot.dev',
    userAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150',
    jobId: 'cs-automattic-fullstack-core',
    jobTitle: 'Senior Full Stack Engineer - Gutenberg & Web Core',
    company: 'Automattic',
    companyLogo: 'https://logo.clearbit.com/automattic.com',
    stage: 'interview',
    appliedAt: '2026-09-21T14:20:00Z',
    matchScore: 94,
    resumeVersion: 'FullStack v3 - AI Tailored',
    sourceUrl: 'https://automattic.com/work-with-us',
    salaryRange: '$145,000 - $185,000',
    notes: 'Phone screen completed, technical architecture interview scheduled.',
  },
];

export class JobsService {
  /**
   * List jobs with rich filtering, searching, sorting, and pagination
   */
  async listJobs(params: JobQueryParams): Promise<JobPaginatedResponse> {
    const {
      page = 1,
      limit = 20,
      search,
      category,
      specialization,
      jobType,
      location,
      source,
      featured,
      sortBy,
      sortOrder = 'desc',
    } = params;

    const { connected } = await checkDatabaseConnection();

    let allJobs: Job[] = Array.from(jobsMap.values());

    if (connected) {
      try {
        const dbJobs = await prisma.job.findMany({
          orderBy: { publicationDate: sortOrder },
        });

        if (dbJobs.length > 0) {
          allJobs = dbJobs.map((j: any) => ({
            id: j.id,
            title: j.title,
            company_name: j.companyName,
            company_logo: j.companyLogo || undefined,
            category: j.category,
            specialization: j.specialization || undefined,
            job_type: j.jobType,
            candidate_required_location: j.candidateRequiredLocation,
            salary: j.salary || undefined,
            publication_date: j.publicationDate.toISOString(),
            description: j.description,
            url: j.url,
            tags: j.tags,
            source: j.source,
            company_website: j.companyWebsite || undefined,
            featured: j.featured,
          }));
        }
      } catch (err) {
        logger.warn({ err }, 'Prisma query failed in listJobs, using memory store');
      }
    }

    // Apply filtering
    let filtered = allJobs.filter((job) => {
      if (category && category !== 'All Categories' && category !== 'all') {
        if (
          job.category.toLowerCase() !== category.toLowerCase() &&
          job.specialization?.toLowerCase() !== category.toLowerCase()
        ) {
          return false;
        }
      }

      if (specialization && specialization !== 'all') {
        if (job.specialization?.toLowerCase() !== specialization.toLowerCase()) {
          return false;
        }
      }

      if (jobType && jobType !== 'All Types' && jobType !== 'all') {
        if (job.job_type.toLowerCase() !== jobType.toLowerCase()) {
          return false;
        }
      }

      if (location && location !== 'All Locations' && location !== 'all') {
        if (
          !job.candidate_required_location
            .toLowerCase()
            .includes(location.toLowerCase())
        ) {
          return false;
        }
      }

      if (source && source !== 'All Sources' && source !== 'all') {
        if (!job.source.toLowerCase().includes(source.toLowerCase())) {
          return false;
        }
      }

      if (featured !== undefined) {
        if (job.featured !== featured) return false;
      }

      if (search && search.trim()) {
        const query = search.trim().toLowerCase();
        const matchesTitle = job.title.toLowerCase().includes(query);
        const matchesCompany = job.company_name.toLowerCase().includes(query);
        const matchesTags = job.tags.some((t) => t.toLowerCase().includes(query));
        const matchesDesc = job.description.toLowerCase().includes(query);
        if (!matchesTitle && !matchesCompany && !matchesTags && !matchesDesc) {
          return false;
        }
      }

      return true;
    });

    // Sorting
    filtered.sort((a, b) => {
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;

      if (sortBy === 'salary') {
        return (b.salary || '').localeCompare(a.salary || '');
      }
      if (sortBy === 'company') {
        return a.company_name.localeCompare(b.company_name);
      }

      const dateA = new Date(a.publication_date).getTime();
      const dateB = new Date(b.publication_date).getTime();
      return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
    });

    const total = filtered.length;
    const startIndex = (page - 1) * limit;
    const paginated = filtered.slice(startIndex, startIndex + limit);

    return {
      jobs: paginated,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit) || 1,
    };
  }

  /**
   * Retrieve a single job posting by ID
   */
  async getJobById(id: string): Promise<Job> {
    const memoryJob = jobsMap.get(id);
    if (memoryJob) return memoryJob;

    const { connected } = await checkDatabaseConnection();
    if (connected) {
      const dbJob = await prisma.job.findUnique({ where: { id } });
      if (dbJob) {
        return {
          id: dbJob.id,
          title: dbJob.title,
          company_name: dbJob.companyName,
          company_logo: dbJob.companyLogo || undefined,
          category: dbJob.category,
          specialization: dbJob.specialization || undefined,
          job_type: dbJob.jobType,
          candidate_required_location: dbJob.candidateRequiredLocation,
          salary: dbJob.salary || undefined,
          publication_date: dbJob.publicationDate.toISOString(),
          description: dbJob.description,
          url: dbJob.url,
          tags: dbJob.tags,
          source: dbJob.source,
          company_website: dbJob.companyWebsite || undefined,
          featured: dbJob.featured,
        };
      }
    }

    throw new NotFoundError(`Job with ID '${id}' not found`);
  }

  /**
   * Post a new job
   */
  async createJob(data: CreateJobRequest): Promise<Job> {
    const id = `cs-custom-${crypto.randomUUID().slice(0, 8)}`;
    const newJob: Job = {
      id,
      title: data.title,
      company_name: data.company_name,
      company_logo: data.company_logo || undefined,
      category: data.category,
      specialization: data.specialization || data.category,
      job_type: data.job_type,
      candidate_required_location: data.candidate_required_location,
      salary: data.salary,
      publication_date: new Date().toISOString(),
      description: data.description,
      url: data.url,
      tags: data.tags,
      source: data.source,
      company_website: data.company_website || undefined,
      featured: data.featured,
    };

    jobsMap.set(id, newJob);

    const { connected } = await checkDatabaseConnection();
    if (connected) {
      try {
        await prisma.job.create({
          data: {
            id,
            title: newJob.title,
            companyName: newJob.company_name,
            companyLogo: newJob.company_logo,
            category: newJob.category,
            specialization: newJob.specialization,
            jobType: newJob.job_type,
            candidateRequiredLocation: newJob.candidate_required_location,
            salary: newJob.salary,
            description: newJob.description,
            url: newJob.url,
            tags: newJob.tags,
            source: newJob.source,
            companyWebsite: newJob.company_website,
            featured: newJob.featured,
          },
        });
      } catch (err) {
        logger.warn({ err }, 'Prisma write failed during createJob');
      }
    }

    return newJob;
  }

  /**
   * Toggle saved/bookmarked job status for user
   */
  async toggleSaveJob(userId: string, jobId: string): Promise<{ isSaved: boolean; savedJobIds: string[] }> {
    await this.getJobById(jobId); // Ensure job exists

    let userSaved = userSavedJobsMap.get(userId);
    if (!userSaved) {
      userSaved = new Set<string>();
      userSavedJobsMap.set(userId, userSaved);
    }

    let isSaved = false;
    if (userSaved.has(jobId)) {
      userSaved.delete(jobId);
      isSaved = false;
    } else {
      userSaved.add(jobId);
      isSaved = true;
    }

    const { connected } = await checkDatabaseConnection();
    if (connected) {
      try {
        if (isSaved) {
          await prisma.savedJob.upsert({
            where: { userId_jobId: { userId, jobId } },
            create: { userId, jobId },
            update: {},
          });
        } else {
          await prisma.savedJob.deleteMany({
            where: { userId, jobId },
          });
        }
      } catch (err) {
        logger.warn({ err }, 'Prisma toggle savedJob failed, keeping memory state');
      }
    }

    return {
      isSaved,
      savedJobIds: Array.from(userSaved),
    };
  }

  /**
   * Retrieve all saved jobs for a user
   */
  async getSavedJobs(userId: string): Promise<Job[]> {
    const savedIds = userSavedJobsMap.get(userId) || new Set<string>();
    const result: Job[] = [];
    for (const id of savedIds) {
      const job = jobsMap.get(id);
      if (job) result.push(job);
    }
    return result;
  }

  /**
   * Submit application for a job
   */
  async applyJob(userId: string, data: ApplyJobRequest): Promise<JobApplication> {
    const job = await this.getJobById(data.jobId);
    let userProfile = { name: 'Applicant', email: 'applicant@codeslot.dev', avatar: undefined as string | undefined };

    try {
      const profile = await authService.getProfileById(userId);
      userProfile = {
        name: profile.name,
        email: profile.email,
        avatar: profile.avatar,
      };
    } catch {
      // ignore
    }

    const application: JobApplication = {
      id: `app-${crypto.randomUUID().slice(0, 8)}`,
      userId,
      userName: userProfile.name,
      userEmail: userProfile.email,
      userAvatar: userProfile.avatar,
      jobId: job.id,
      jobTitle: job.title,
      company: job.company_name,
      companyLogo: job.company_logo,
      stage: 'applied',
      appliedAt: new Date().toISOString(),
      matchScore: data.matchScore || 88,
      resumeVersion: data.resumeVersion || 'AI Tailored',
      sourceUrl: job.url,
      salaryRange: data.salaryRange || job.salary,
      notes: data.notes,
    };

    applicationsList.unshift(application);

    const { connected } = await checkDatabaseConnection();
    if (connected) {
      try {
        await prisma.jobApplication.create({
          data: {
            id: application.id,
            userId,
            jobId: job.id,
            stage: application.stage,
            matchScore: application.matchScore,
            resumeVersion: application.resumeVersion,
            salaryRange: application.salaryRange,
            notes: application.notes,
          },
        });
      } catch (err) {
        logger.warn({ err }, 'Prisma applyJob write failed, recorded in memory');
      }
    }

    return application;
  }

  /**
   * Get all applications submitted by user
   */
  async getUserApplications(userId: string): Promise<JobApplication[]> {
    return applicationsList.filter((a) => a.userId === userId);
  }

  /**
   * Get all applications (for admin)
   */
  getAllApplications(): JobApplication[] {
    return applicationsList;
  }

  /**
   * Update application stage (for admin)
   */
  updateApplicationStage(
    appId: string,
    stage: 'applied' | 'screening' | 'interview' | 'offer' | 'rejected' | 'archived'
  ): JobApplication | null {
    const app = applicationsList.find((a) => a.id === appId);
    if (app) {
      app.stage = stage;
      return app;
    }
    return null;
  }
}

export const jobsService = new JobsService();
