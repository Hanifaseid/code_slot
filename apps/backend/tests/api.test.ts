import { describe, it, expect } from 'vitest';
import request from 'supertest';
import { app } from '../src/app.js';

describe('CodeSlot Full Backend API Endpoints', () => {
  let authToken = '';
  let adminToken = '';

  // 1. Auth Module Tests
  describe('Auth Module (/api/auth)', () => {
    it('POST /api/auth/demo-login should authenticate demo candidate and return JWT', async () => {
      const res = await request(app)
        .post('/api/auth/demo-login')
        .send({ role: 'candidate' });

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data).toHaveProperty('token');
      expect(res.body.data.user).toHaveProperty('email', 'alex.mercer@codeslot.dev');
      authToken = res.body.data.token;
    });

    it('POST /api/auth/demo-login should authenticate demo admin', async () => {
      const res = await request(app)
        .post('/api/auth/demo-login')
        .send({ role: 'admin' });

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.user).toHaveProperty('role', 'admin');
      adminToken = res.body.data.token;
    });

    it('GET /api/auth/me should return current user profile with valid Bearer token', async () => {
      const res = await request(app)
        .get('/api/auth/me')
        .set('Authorization', `Bearer ${authToken}`);

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.user).toHaveProperty('email', 'alex.mercer@codeslot.dev');
    });

    it('GET /api/auth/me should return 401 when token is missing', async () => {
      const res = await request(app).get('/api/auth/me');
      expect(res.status).toBe(401);
      expect(res.body.success).toBe(false);
    });
  });

  // 2. Jobs Module Tests
  describe('Jobs Module (/api/jobs)', () => {
    it('GET /api/jobs should return paginated real jobs', async () => {
      const res = await request(app).get('/api/jobs?limit=5');
      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data).toHaveProperty('jobs');
      expect(Array.isArray(res.body.data.jobs)).toBe(true);
      expect(res.body.data.jobs.length).toBeGreaterThan(0);
      expect(res.body.data.jobs[0]).toHaveProperty('title');
      expect(res.body.data.jobs[0]).toHaveProperty('company_name');
    });

    it('GET /api/jobs/:id should return specific job details', async () => {
      const res = await request(app).get('/api/jobs/cs-linear-staff-eng');
      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data).toHaveProperty('company_name', 'Linear');
    });

    it('POST /api/jobs/:id/save should toggle bookmark for authenticated user', async () => {
      const res = await request(app)
        .post('/api/jobs/cs-linear-staff-eng/save')
        .set('Authorization', `Bearer ${authToken}`);

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data).toHaveProperty('isSaved');
    });
  });

  // 3. Resume & AI Module Tests
  describe('Resume Studio Module (/api/resume)', () => {
    it('POST /api/resume/enhance-bullet should rewrite bullet using Google X-Y-Z formula', async () => {
      const res = await request(app)
        .post('/api/resume/enhance-bullet')
        .send({
          originalBullet: 'Built high performance caching layer with Redis',
          jobTitle: 'Backend Engineer',
        });

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data).toHaveProperty('enhancedBullet');
      expect(res.body.data.enhancedBullet).toContain('Engineered and scaled');
    });

    it('POST /api/resume/tailor should tailor candidate resume against job description', async () => {
      const sampleResume = {
        personalInfo: {
          fullName: 'Alex Mercer',
          jobTitle: 'Distributed Systems Engineer',
          email: 'alex@example.com',
          phone: '+1-555-0199',
          location: 'Austin, TX',
          summary: 'Experienced backend systems developer.',
        },
        experience: [
          {
            id: 'exp-1',
            title: 'Senior Engineer',
            company: 'Tech Corp',
            location: 'Remote',
            startDate: '2023-01',
            endDate: 'Present',
            current: true,
            highlights: ['Designed high-throughput microservices in Go.'],
          },
        ],
        skills: {
          technical: ['Go', 'PostgreSQL', 'Docker'],
          tools: ['Git', 'Linux'],
          soft: ['Problem Solving'],
        },
        projects: [],
        education: [
          {
            id: 'edu-1',
            institution: 'University of Texas',
            degree: 'B.S.',
            fieldOfStudy: 'Computer Science',
            startYear: '2016',
            endYear: '2020',
          },
        ],
        certifications: [],
      };

      const res = await request(app)
        .post('/api/resume/tailor')
        .send({
          currentResume: sampleResume,
          jobTitle: 'Staff Backend Engineer',
          companyName: 'Stripe',
          jobDescription: 'Looking for a Staff Backend Engineer with Go, Distributed Systems, and PostgreSQL experience.',
        });

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data).toHaveProperty('tailoredResume');
      expect(res.body.data).toHaveProperty('atsScore');
      expect(res.body.data.atsScore).toBeGreaterThanOrEqual(80);
      expect(res.body.data).toHaveProperty('matchedKeywords');
    });
  });

  // 4. Admin Module Tests
  describe('Admin Control Plane (/api/admin)', () => {
    it('GET /api/admin/stats should reject non-admin users with 403', async () => {
      const res = await request(app)
        .get('/api/admin/stats')
        .set('Authorization', `Bearer ${authToken}`); // candidate token

      expect(res.status).toBe(403);
      expect(res.body.success).toBe(false);
    });

    it('GET /api/admin/stats should return platform metrics for admin', async () => {
      const res = await request(app)
        .get('/api/admin/stats')
        .set('Authorization', `Bearer ${adminToken}`);

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data).toHaveProperty('totalUsers');
      expect(res.body.data).toHaveProperty('dailyActiveUsers');
      expect(res.body.data).toHaveProperty('totalJobs');
      expect(res.body.data).toHaveProperty('aiResumesTailored');
    });

    it('GET /api/admin/users should return managed candidates and recruiters for admin', async () => {
      const res = await request(app)
        .get('/api/admin/users')
        .set('Authorization', `Bearer ${adminToken}`);

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(Array.isArray(res.body.data)).toBe(true);
      expect(res.body.data.length).toBeGreaterThan(0);
    });
  });
});
