import crypto from 'node:crypto';
import type {
  RegisterRequest,
  LoginRequest,
  UserProfile,
  AuthResponse,
  UpdateProfileRequest,
} from '@code-slot/shared';
import { prisma, checkDatabaseConnection } from '../../database/client.js';
import { hashPassword, verifyPassword, signToken } from '../../utils/security.js';
import { BadRequestError, NotFoundError } from '../../common/errors.js';
import { logger } from '../../utils/logger.js';

interface InternalUserRecord {
  id: string;
  email: string;
  passwordHash: string;
  name: string;
  title?: string;
  avatar?: string;
  role: 'candidate' | 'recruiter' | 'admin';
  status: 'active' | 'idle' | 'suspended' | 'verified';
  plan: 'Free' | 'Pro Dev' | 'Enterprise';
  experienceLevel?: string;
  location?: string;
  skills: string[];
  specialization?: string;
  githubUrl?: string;
  linkedinUrl?: string;
  portfolioUrl?: string;
  portfolioImage?: string;
  portfolioProjectTitle?: string;
  savedJobIds: string[];
  appliedJobIds: string[];
  resumeScore: number;
  createdAt: string;
}

// Built-in store to guarantee seamless functionality if database is not yet migrated/connected
const inMemoryUsers: Map<string, InternalUserRecord> = new Map([
  [
    'admin@gmail.com',
    {
      id: 'usr-admin-01',
      email: 'admin@gmail.com',
      passwordHash: hashPassword('admin1122'),
      name: 'Super Admin',
      title: 'Lead Platform Administrator',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
      role: 'admin',
      status: 'active',
      plan: 'Enterprise',
      location: 'San Francisco, CA (Remote)',
      skills: ['Distributed Systems', 'Cloud Architecture', 'TypeScript', 'Kubernetes'],
      specialization: 'Platform Architecture',
      savedJobIds: [],
      appliedJobIds: [],
      resumeScore: 98,
      createdAt: '2026-01-01T00:00:00.000Z',
    },
  ],
  [
    'sarah.chen@techmail.io',
    {
      id: 'usr-sarah-03',
      email: 'sarah.chen@techmail.io',
      passwordHash: hashPassword('sarah1122'),
      name: 'Sarah Chen',
      title: 'Staff Frontend Architect',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150',
      role: 'candidate',
      status: 'verified',
      plan: 'Enterprise',
      location: 'Seattle, WA (Remote)',
      skills: ['React', 'TypeScript', 'Next.js', 'Web Performance', 'GraphQL', 'Tailwind'],
      specialization: 'Frontend',
      githubUrl: 'https://github.com/sarahchen',
      linkedinUrl: 'https://linkedin.com/in/sarahchen',
      portfolioUrl: 'https://sarahchen.design',
      portfolioImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=80',
      portfolioProjectTitle: 'Real-Time Design System & Canvas Engine',
      savedJobIds: ['cs-linear-staff-eng'],
      appliedJobIds: ['cs-linear-staff-eng'],
      resumeScore: 96,
      createdAt: '2026-01-20T11:15:00.000Z',
    },
  ],
  [
    'elena.rostova@ai-research.org',
    {
      id: 'usr-elena-04',
      email: 'elena.rostova@ai-research.org',
      passwordHash: hashPassword('elena1122'),
      name: 'Elena Rostova',
      title: 'Principal Machine Learning Scientist',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150',
      role: 'candidate',
      status: 'verified',
      plan: 'Enterprise',
      location: 'Zurich, Switzerland (Remote)',
      skills: ['PyTorch', 'Transformers', 'LLM Fine-tuning', 'Python', 'CUDA', 'vLLM'],
      specialization: 'AI & Machine Learning',
      githubUrl: 'https://github.com/elena-rostova',
      linkedinUrl: 'https://linkedin.com/in/elenarostova',
      portfolioUrl: 'https://elena-ai.org',
      portfolioImage: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop&q=80',
      portfolioProjectTitle: 'Low-Latency Neural Inferencing Accelerator',
      savedJobIds: ['cs-openai-research-eng'],
      appliedJobIds: ['cs-openai-research-eng'],
      resumeScore: 98,
      createdAt: '2026-02-10T16:20:00.000Z',
    },
  ],
  [
    'david.okafor@cloudengine.dev',
    {
      id: 'usr-david-05',
      email: 'david.okafor@cloudengine.dev',
      passwordHash: hashPassword('david1122'),
      name: 'David Okafor',
      title: 'Lead Platform / Cloud Engineer',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
      role: 'candidate',
      status: 'active',
      plan: 'Pro Dev',
      location: 'Austin, TX (Remote)',
      skills: ['AWS', 'Terraform', 'Kubernetes', 'CI/CD', 'Docker', 'Prometheus'],
      specialization: 'DevOps / Cloud',
      githubUrl: 'https://github.com/david-okafor',
      linkedinUrl: 'https://linkedin.com/in/davidokafor',
      portfolioUrl: 'https://davidokafor.cloud',
      portfolioImage: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&auto=format&fit=crop&q=80',
      portfolioProjectTitle: 'Multi-Region Kubernetes Fleet Manager',
      savedJobIds: ['cs-stripe-backend-infra'],
      appliedJobIds: [],
      resumeScore: 89,
      createdAt: '2026-02-01T14:45:00.000Z',
    },
  ],
]);

function toUserProfile(user: InternalUserRecord): UserProfile {
  return {
    id: user.id,
    email: user.email,
    name: user.name,
    title: user.title,
    avatar: user.avatar,
    role: user.role,
    status: user.status,
    plan: user.plan,
    experienceLevel: user.experienceLevel || 'intermediate',
    location: user.location,
    skills: user.skills,
    specialization: user.specialization,
    githubUrl: user.githubUrl,
    linkedinUrl: user.linkedinUrl,
    portfolioUrl: user.portfolioUrl,
    portfolioImage: user.portfolioImage,
    portfolioProjectTitle: user.portfolioProjectTitle,
    savedJobIds: user.savedJobIds,
    appliedJobIds: user.appliedJobIds,
    createdAt: user.createdAt,
  };
}

export class AuthService {
  /**
   * Register a new user account
   */
  async register(data: RegisterRequest): Promise<AuthResponse> {
    const normalizedEmail = data.email.trim().toLowerCase();

    // Check if email already registered in memory or database
    if (inMemoryUsers.has(normalizedEmail)) {
      throw new BadRequestError('An account with this email address already exists');
    }

    const { connected } = await checkDatabaseConnection();
    let createdUser: InternalUserRecord;

    const passwordHash = hashPassword(data.password);
    const userId = `usr-${crypto.randomUUID()}`;
    const nowIso = new Date().toISOString();

    if (connected) {
      try {
        const existing = await prisma.user.findUnique({
          where: { email: normalizedEmail },
        });
        if (existing) {
          throw new BadRequestError('An account with this email address already exists');
        }

        const dbUser = await prisma.user.create({
          data: {
            id: userId,
            email: normalizedEmail,
            passwordHash,
            name: data.name,
            title: data.title || 'Software Engineer',
            role: data.role || 'candidate',
            status: 'active',
            plan: 'Free',
            skills: [],
          },
        });

        createdUser = {
          id: dbUser.id,
          email: dbUser.email,
          passwordHash: dbUser.passwordHash,
          name: dbUser.name,
          title: dbUser.title || undefined,
          role: dbUser.role as 'candidate' | 'recruiter' | 'admin',
          status: dbUser.status as 'active',
          plan: dbUser.plan as 'Free',
          skills: dbUser.skills,
          savedJobIds: [],
          appliedJobIds: [],
          resumeScore: dbUser.resumeScore,
          createdAt: dbUser.createdAt.toISOString(),
        };
      } catch (err) {
        if (err instanceof BadRequestError) throw err;
        logger.warn({ err }, 'Prisma write failed during register, using memory fallback');
        createdUser = {
          id: userId,
          email: normalizedEmail,
          passwordHash,
          name: data.name,
          title: data.title || 'Software Engineer',
          role: data.role || 'candidate',
          status: 'active',
          plan: 'Free',
          skills: [],
          savedJobIds: [],
          appliedJobIds: [],
          resumeScore: 75,
          createdAt: nowIso,
        };
      }
    } else {
      createdUser = {
        id: userId,
        email: normalizedEmail,
        passwordHash,
        name: data.name,
        title: data.title || 'Software Engineer',
        role: data.role || 'candidate',
        status: 'active',
        plan: 'Free',
        skills: [],
        savedJobIds: [],
        appliedJobIds: [],
        resumeScore: 75,
        createdAt: nowIso,
      };
    }

    inMemoryUsers.set(normalizedEmail, createdUser);

    const token = signToken({
      userId: createdUser.id,
      email: createdUser.email,
      role: createdUser.role,
    });

    return {
      user: toUserProfile(createdUser),
      token,
    };
  }

  /**
   * Log into an existing account
   */
  async login(data: LoginRequest): Promise<AuthResponse> {
    const normalizedEmail = data.email.trim().toLowerCase();
    let user = inMemoryUsers.get(normalizedEmail);

    if (!user) {
      const { connected } = await checkDatabaseConnection();
      if (connected) {
        try {
          const dbUser = await prisma.user.findUnique({
            where: { email: normalizedEmail },
            include: {
              savedJobs: true,
              applications: true,
            },
          });
          if (dbUser) {
            user = {
              id: dbUser.id,
              email: dbUser.email,
              passwordHash: dbUser.passwordHash,
              name: dbUser.name,
              title: dbUser.title || undefined,
              avatar: dbUser.avatar || undefined,
              role: dbUser.role as 'candidate' | 'recruiter' | 'admin',
              status: dbUser.status as 'active',
              plan: dbUser.plan as 'Free',
              location: dbUser.location || undefined,
              skills: dbUser.skills,
              specialization: dbUser.specialization || undefined,
              githubUrl: dbUser.githubUrl || undefined,
              linkedinUrl: dbUser.linkedinUrl || undefined,
              portfolioUrl: dbUser.portfolioUrl || undefined,
              savedJobIds: dbUser.savedJobs.map((sj: any) => sj.jobId),
              appliedJobIds: dbUser.applications.map((app: any) => app.jobId),
              resumeScore: dbUser.resumeScore,
              createdAt: dbUser.createdAt.toISOString(),
            };
            inMemoryUsers.set(normalizedEmail, user);
          }
        } catch (err) {
          logger.warn({ err }, 'Prisma query failed during login, checking memory store');
        }
      }
    }

    if (!user) {
      throw new BadRequestError('Invalid email or password', 'INVALID_CREDENTIALS');
    }

    const isValid = verifyPassword(data.password, user.passwordHash);
    if (!isValid) {
      throw new BadRequestError('Invalid email or password', 'INVALID_CREDENTIALS');
    }

    const token = signToken({
      userId: user.id,
      email: user.email,
      role: user.role,
    });

    return {
      user: toUserProfile(user),
      token,
    };
  }

  /**
   * Get user profile by ID
   */
  async getProfileById(userId: string): Promise<UserProfile> {
    for (const u of inMemoryUsers.values()) {
      if (u.id === userId) {
        return toUserProfile(u);
      }
    }

    const { connected } = await checkDatabaseConnection();
    if (connected) {
      const dbUser = await prisma.user.findUnique({
        where: { id: userId },
        include: { savedJobs: true, applications: true },
      });
      if (dbUser) {
        return {
          id: dbUser.id,
          email: dbUser.email,
          name: dbUser.name,
          title: dbUser.title || undefined,
          avatar: dbUser.avatar || undefined,
          role: dbUser.role as 'candidate' | 'recruiter' | 'admin',
          status: dbUser.status as 'active',
          plan: dbUser.plan as 'Free',
          experienceLevel: (dbUser as any).experienceLevel || 'intermediate',
          location: dbUser.location || undefined,
          skills: dbUser.skills,
          specialization: dbUser.specialization || undefined,
          githubUrl: dbUser.githubUrl || undefined,
          linkedinUrl: dbUser.linkedinUrl || undefined,
          portfolioUrl: dbUser.portfolioUrl || undefined,
          savedJobIds: dbUser.savedJobs.map((s: any) => s.jobId),
          appliedJobIds: dbUser.applications.map((a: any) => a.jobId),
          createdAt: dbUser.createdAt.toISOString(),
        };
      }
    }

    throw new NotFoundError('User not found');
  }

  /**
   * Helper to get internal user record by email
   */
  getUserByEmail(email: string): InternalUserRecord | undefined {
    return inMemoryUsers.get(email.toLowerCase());
  }

  /**
   * Helper to get all managed users for admin portal
   */
  getAllUsers(): InternalUserRecord[] {
    return Array.from(inMemoryUsers.values());
  }

  /**
   * Update user status (for admin)
   */
  updateUserStatus(userId: string, status: 'active' | 'idle' | 'suspended' | 'verified'): boolean {
    for (const [email, user] of inMemoryUsers.entries()) {
      if (user.id === userId) {
        user.status = status;
        inMemoryUsers.set(email, user);
        return true;
      }
    }
    return false;
  }

  /**
   * Update candidate / recruiter profile
   */
  async updateProfile(userId: string, data: UpdateProfileRequest): Promise<UserProfile> {
    let updatedRecord: InternalUserRecord | undefined;

    for (const [email, user] of inMemoryUsers.entries()) {
      if (user.id === userId) {
        if (data.name !== undefined) user.name = data.name.trim();
        if (data.title !== undefined) user.title = data.title;
        if (data.avatar !== undefined) user.avatar = data.avatar;
        if (data.location !== undefined) user.location = data.location;
        if (data.skills !== undefined) user.skills = data.skills;
        if (data.specialization !== undefined) user.specialization = data.specialization;
        if (data.experienceLevel !== undefined) user.experienceLevel = data.experienceLevel;
        if (data.githubUrl !== undefined) user.githubUrl = data.githubUrl;
        if (data.linkedinUrl !== undefined) user.linkedinUrl = data.linkedinUrl;
        if (data.portfolioUrl !== undefined) user.portfolioUrl = data.portfolioUrl;
        if ((data as any).portfolioImage !== undefined) user.portfolioImage = (data as any).portfolioImage;
        if ((data as any).portfolioProjectTitle !== undefined) user.portfolioProjectTitle = (data as any).portfolioProjectTitle;

        inMemoryUsers.set(email, user);
        updatedRecord = user;
        break;
      }
    }

    const { connected } = await checkDatabaseConnection();
    if (connected) {
      try {
        const dbUser = await prisma.user.update({
          where: { id: userId },
          data: {
            name: data.name?.trim(),
            title: data.title,
            avatar: data.avatar,
            location: data.location,
            skills: data.skills,
            specialization: data.specialization,
            githubUrl: data.githubUrl,
            linkedinUrl: data.linkedinUrl,
            portfolioUrl: data.portfolioUrl,
          },
          include: { savedJobs: true, applications: true },
        });

        if (dbUser) {
          return {
            id: dbUser.id,
            email: dbUser.email,
            name: dbUser.name,
            title: dbUser.title || undefined,
            avatar: dbUser.avatar || undefined,
            role: dbUser.role as 'candidate' | 'recruiter' | 'admin',
            status: dbUser.status as 'active',
            plan: dbUser.plan as 'Free',
            experienceLevel: (dbUser as any).experienceLevel || 'intermediate',
            location: dbUser.location || undefined,
            skills: dbUser.skills,
            specialization: dbUser.specialization || undefined,
            githubUrl: dbUser.githubUrl || undefined,
            linkedinUrl: dbUser.linkedinUrl || undefined,
            portfolioUrl: dbUser.portfolioUrl || undefined,
            savedJobIds: dbUser.savedJobs.map((s: any) => s.jobId),
            appliedJobIds: dbUser.applications.map((a: any) => a.jobId),
            createdAt: dbUser.createdAt.toISOString(),
          };
        }
      } catch (err) {
        logger.warn({ err }, 'Prisma update failed in updateProfile, returning in-memory state');
      }
    }

    if (updatedRecord) {
      return toUserProfile(updatedRecord);
    }

    throw new NotFoundError(`User with ID '${userId}' not found`);
  }

  /**
   * Record bookmarked job ID on user in-memory record
   */
  recordSavedJob(userId: string, jobId: string, isSaved: boolean): void {
    for (const user of inMemoryUsers.values()) {
      if (user.id === userId) {
        if (isSaved) {
          if (!user.savedJobIds.includes(jobId)) {
            user.savedJobIds.push(jobId);
          }
        } else {
          user.savedJobIds = user.savedJobIds.filter((id) => id !== jobId);
        }
        break;
      }
    }
  }

  /**
   * Record applied job ID on user in-memory record
   */
  recordAppliedJob(userId: string, jobId: string): void {
    for (const user of inMemoryUsers.values()) {
      if (user.id === userId) {
        if (!user.appliedJobIds.includes(jobId)) {
          user.appliedJobIds.push(jobId);
        }
        break;
      }
    }
  }
}

export const authService = new AuthService();
