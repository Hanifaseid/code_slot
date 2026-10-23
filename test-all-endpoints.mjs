// Comprehensive End-to-End Test Suite for All CodeSlot Endpoints
const BASE_URL = 'http://localhost:5000';

const results = [];

async function runTest(name, fn) {
  process.stdout.write(`⏳ Testing: ${name}... `);
  const start = Date.now();
  try {
    const res = await fn();
    const duration = Date.now() - start;
    console.log(`✅ PASS (${duration}ms) - ${res || 'OK'}`);
    results.push({ name, status: 'PASS', duration, details: res });
  } catch (err) {
    const duration = Date.now() - start;
    console.log(`❌ FAIL (${duration}ms) - ${err.message}`);
    results.push({ name, status: 'FAIL', duration, error: err.message });
  }
}

async function startSuite() {
  console.log('='.repeat(70));
  console.log('🚀 CODESLOT END-TO-END ENDPOINT TEST SUITE');
  console.log(`Target Base URL: ${BASE_URL}`);
  console.log('='.repeat(70) + '\n');

  let adminToken = '';
  let candidateToken = '';
  let testUserId = '';
  let sampleJobId = '';
  let testCreatedJobId = '';
  let sampleApplicationId = '';

  // --- 1. HEALTH CHECKS ---
  await runTest('1. GET /health (Root Liveness Healthcheck)', async () => {
    const res = await fetch(`${BASE_URL}/health`);
    if (res.status !== 200) throw new Error(`HTTP ${res.status}`);
    const json = await res.json();
    return `Status: ${json.status}, Service: ${json.service}, Uptime: ${json.uptime}s`;
  });

  await runTest('2. GET /api/health (API Healthcheck)', async () => {
    const res = await fetch(`${BASE_URL}/api/health`);
    if (res.status !== 200) throw new Error(`HTTP ${res.status}`);
    const json = await res.json();
    return `DB: ${json.data?.database || 'ok'}, Memory: ${json.data?.memory?.usedMb || 0}MB`;
  });

  // --- 2. AUTHENTICATION & USERS ---
  await runTest('3. POST /api/auth/login (Admin Credentials admin@gmail.com)', async () => {
    const res = await fetch(`${BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'admin@gmail.com', password: 'admin1122' }),
    });
    const json = await res.json();
    if (!json.success || !json.data?.token) throw new Error(json.error?.message || 'Login failed');
    adminToken = json.data.token;
    return `Logged in as: ${json.data.user.name} (Role: ${json.data.user.role})`;
  });

  await runTest('4. POST /api/auth/demo-login (Candidate Quick Demo Login)', async () => {
    const res = await fetch(`${BASE_URL}/api/auth/demo-login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ role: 'candidate' }),
    });
    const json = await res.json();
    if (!json.success || !json.data?.token) throw new Error(json.error?.message || 'Demo login failed');
    candidateToken = json.data.token;
    return `Logged in as: ${json.data.user.name} (Role: ${json.data.user.role})`;
  });

  const uniqueEmail = `test.dev.${Date.now()}@codeslot.dev`;
  await runTest('5. POST /api/auth/register (New Developer Registration with Seniority)', async () => {
    const res = await fetch(`${BASE_URL}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: uniqueEmail,
        password: 'Password123!',
        name: 'Jordan Sparks',
        title: 'Senior Distributed Engineer',
        experienceLevel: 'senior',
        role: 'candidate',
      }),
    });
    const json = await res.json();
    if (!json.success || !json.data?.user) throw new Error(json.error?.message || 'Register failed');
    testUserId = json.data.user.id;
    return `Registered: ${json.data.user.email} (ID: ${testUserId})`;
  });

  await runTest('6. GET /api/auth/me (Protected Candidate Profile with Seniority)', async () => {
    const res = await fetch(`${BASE_URL}/api/auth/me`, {
      headers: { Authorization: `Bearer ${candidateToken}` },
    });
    const json = await res.json();
    if (!json.success) throw new Error(json.error?.message || 'Profile fetch failed');
    return `User: ${json.data.user.name}, Plan: ${json.data.user.plan}, Level: ${json.data.user.experienceLevel || 'Intermediate'}`;
  });

  await runTest('7. PATCH /api/auth/profile (Update Seniority & Track)', async () => {
    const res = await fetch(`${BASE_URL}/api/auth/profile`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${candidateToken}`,
      },
      body: JSON.stringify({
        name: 'Alex Mercer (Updated)',
        title: 'Principal Distributed Architect',
        specialization: 'Backend',
        experienceLevel: 'Senior',
        skills: ['Go', 'TypeScript', 'Kubernetes', 'PostgreSQL', 'Rust'],
      }),
    });
    const json = await res.json();
    if (!json.success) throw new Error(json.error?.message || 'Profile update failed');
    return `Updated Title: ${json.data.user.title}, Level: ${json.data.user.experienceLevel}`;
  });

  // --- 3. REMOTE TECH JOBS ---
  await runTest('8. GET /api/jobs (List Jobs Catalog with Pagination)', async () => {
    const res = await fetch(`${BASE_URL}/api/jobs?limit=10&page=1`);
    const json = await res.json();
    if (!json.success) throw new Error(json.error?.message || 'Jobs fetch failed');
    const jobs = json.data.jobs;
    if (jobs.length > 0) sampleJobId = jobs[0].id;
    return `Found ${json.data.total} total jobs (Loaded ${jobs.length} on page 1)`;
  });

  await runTest('9. GET /api/jobs?experienceLevel=senior (Filter Senior Roles)', async () => {
    const res = await fetch(`${BASE_URL}/api/jobs?experienceLevel=senior&limit=5`);
    const json = await res.json();
    if (!json.success) throw new Error(json.error?.message || 'Filter failed');
    return `Matching Senior positions: ${json.data.jobs.length}`;
  });

  await runTest('10. GET /api/jobs?experienceLevel=junior (Filter Junior Roles)', async () => {
    const res = await fetch(`${BASE_URL}/api/jobs?experienceLevel=junior&limit=5`);
    const json = await res.json();
    if (!json.success) throw new Error(json.error?.message || 'Filter failed');
    return `Matching Junior positions: ${json.data.jobs.length}`;
  });

  await runTest('11. GET /api/jobs?experienceLevel=intermediate (Filter Intermediate Roles)', async () => {
    const res = await fetch(`${BASE_URL}/api/jobs?experienceLevel=intermediate&limit=5`);
    const json = await res.json();
    if (!json.success) throw new Error(json.error?.message || 'Filter failed');
    return `Matching Intermediate positions: ${json.data.jobs.length}`;
  });

  await runTest('12. GET /api/jobs/:id (Retrieve Single Job Details)', async () => {
    if (!sampleJobId) sampleJobId = 'cs-linear-staff-eng';
    const res = await fetch(`${BASE_URL}/api/jobs/${sampleJobId}`);
    const json = await res.json();
    if (!json.success) throw new Error(json.error?.message || 'Job detail fetch failed');
    return `Position: "${json.data.title}" at ${json.data.company_name}`;
  });

  await runTest('13. POST /api/jobs/:id/save (Candidate Bookmark Job)', async () => {
    const res = await fetch(`${BASE_URL}/api/jobs/${sampleJobId}/save`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${candidateToken}` },
    });
    const json = await res.json();
    if (!json.success) throw new Error(json.error?.message || 'Job save failed');
    return `Saved status: ${json.data?.saved ? 'Bookmarked' : 'Unbookmarked'}`;
  });

  await runTest('14. POST /api/jobs/:id/apply (Candidate Submit Application)', async () => {
    const res = await fetch(`${BASE_URL}/api/jobs/${sampleJobId}/apply`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${candidateToken}`,
      },
      body: JSON.stringify({
        jobId: sampleJobId,
        matchScore: 92,
        resumeVersion: 'AI Tailored Senior Profile',
        salaryRange: '$180,000 - $220,000',
        notes: 'Excited about distributed consensus and sub-50ms sync engines.',
      }),
    });
    const json = await res.json();
    if (!json.success) throw new Error(json.error?.message || 'Job apply failed');
    return `Application recorded with stage: ${json.data?.stage || 'applied'}`;
  });

  await runTest('15. POST /api/jobs (Admin Publish New Position with Seniority)', async () => {
    const res = await fetch(`${BASE_URL}/api/jobs`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${adminToken}`,
      },
      body: JSON.stringify({
        title: 'Senior Cloud Native Architect',
        company_name: 'Vercel Labs',
        category: 'DevOps / Cloud',
        specialization: 'DevOps / Cloud',
        experienceLevel: 'senior',
        job_type: 'Full-time',
        candidate_required_location: 'Worldwide (Remote)',
        salary: '$190,000 - $250,000 + Equity',
        description: 'Lead edge compute infrastructure and multi-region serverless deployment pipelines.',
        url: 'https://vercel.com/careers',
        tags: ['Edge', 'Rust', 'TypeScript', 'Kubernetes', 'Serverless'],
        source: 'Vercel Direct',
        featured: true,
      }),
    });
    const json = await res.json();
    if (!json.success) throw new Error(json.error?.message || 'Job creation failed');
    testCreatedJobId = json.data.id;
    return `Created Job ID: ${testCreatedJobId} ("${json.data.title}")`;
  });

  // --- 4. RESUME & AI STUDIO ---
  await runTest('16. GET /api/resume/mine (Fetch Stored Resumes)', async () => {
    const res = await fetch(`${BASE_URL}/api/resume/mine`, {
      headers: { Authorization: `Bearer ${candidateToken}` },
    });
    const json = await res.json();
    if (!json.success) throw new Error(json.error?.message || 'Resume fetch failed');
    return `Resumes on cloud: ${json.data?.length || 0}`;
  });

  await runTest('17. POST /api/resume/bullet-enhance (AI Bullet Point Enhancer)', async () => {
    const res = await fetch(`${BASE_URL}/api/resume/bullet-enhance`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${candidateToken}`,
      },
      body: JSON.stringify({
        originalBullet: 'Built database queries and improved site speed for our users.',
        jobTitle: 'Senior Systems Engineer',
        targetKeywords: ['PostgreSQL', 'latency', 'high-concurrency'],
      }),
    });
    const json = await res.json();
    if (!json.success) throw new Error(json.error?.message || 'Enhance failed');
    return `Enhanced: "${json.data?.enhancedBullet?.slice(0, 60)}..."`;
  });

  // --- 5. ADMIN CONTROL PLANE & AUDIT TELEMETRY ---
  await runTest('18. GET /api/admin/stats (Platform KPI Aggregations)', async () => {
    const res = await fetch(`${BASE_URL}/api/admin/stats`, {
      headers: { Authorization: `Bearer ${adminToken}` },
    });
    const json = await res.json();
    if (!json.success) throw new Error(json.error?.message || 'Admin stats failed');
    const s = json.data;
    return `Users: ${s.totalUsers}, Jobs: ${s.totalJobs}, Apps: ${s.totalApplications}, ATS Improvement: +${s.avgAtsImprovement}%`;
  });

  await runTest('19. GET /api/admin/users (Admin User Management Directory)', async () => {
    const res = await fetch(`${BASE_URL}/api/admin/users`, {
      headers: { Authorization: `Bearer ${adminToken}` },
    });
    const json = await res.json();
    if (!json.success) throw new Error(json.error?.message || 'Admin users failed');
    return `Managed accounts in directory: ${json.data.length}`;
  });

  await runTest('20. PATCH /api/admin/users/:id/status (Admin Change User Status)', async () => {
    const res = await fetch(`${BASE_URL}/api/admin/users/usr-alex-02/status`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${adminToken}`,
      },
      body: JSON.stringify({ status: 'verified' }),
    });
    const json = await res.json();
    if (!json.success) throw new Error(json.error?.message || 'Status change failed');
    return `Alex Mercer status updated to: "${json.data?.status}"`;
  });

  await runTest('21. GET /api/admin/activities (Real-time User Activity Stream)', async () => {
    const res = await fetch(`${BASE_URL}/api/admin/activities`, {
      headers: { Authorization: `Bearer ${adminToken}` },
    });
    const json = await res.json();
    if (!json.success) throw new Error(json.error?.message || 'Activities fetch failed');
    return `Streamed activity logs: ${json.data.length}`;
  });

  await runTest('22. POST /api/admin/activities (Log Activity Event)', async () => {
    const res = await fetch(`${BASE_URL}/api/admin/activities`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${candidateToken}`,
      },
      body: JSON.stringify({
        type: 'job_search',
        category: 'jobs',
        action: 'Searched Senior Roles',
        details: 'Candidate searched remote roles with Senior filter',
      }),
    });
    const json = await res.json();
    if (!json.success) throw new Error(json.error?.message || 'Log activity failed');
    return `Event registered with ID: ${json.data?.id}`;
  });

  await runTest('23. GET /api/admin/applications (Admin View Candidate Pipeline)', async () => {
    const res = await fetch(`${BASE_URL}/api/admin/applications`, {
      headers: { Authorization: `Bearer ${adminToken}` },
    });
    const json = await res.json();
    if (!json.success) throw new Error(json.error?.message || 'Applications fetch failed');
    if (json.data.length > 0) sampleApplicationId = json.data[0].id;
    return `Total candidate applications in review: ${json.data.length}`;
  });

  await runTest('24. PATCH /api/admin/applications/:id/stage (Advance Application Stage)', async () => {
    if (!sampleApplicationId) sampleApplicationId = 'app-init-01';
    const res = await fetch(`${BASE_URL}/api/admin/applications/${sampleApplicationId}/stage`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${adminToken}`,
      },
      body: JSON.stringify({ stage: 'offer' }),
    });
    const json = await res.json();
    if (!json.success) throw new Error(json.error?.message || 'Stage update failed');
    return `Application ${sampleApplicationId} advanced to stage: "${json.data?.stage}"`;
  });

  await runTest('25. GET /api/admin/ai-sessions (Admin AI Resume Analytics)', async () => {
    const res = await fetch(`${BASE_URL}/api/admin/ai-sessions`, {
      headers: { Authorization: `Bearer ${adminToken}` },
    });
    const json = await res.json();
    if (!json.success) throw new Error(json.error?.message || 'AI sessions failed');
    return `Logged AI tailoring sessions: ${json.data.length}`;
  });

  await runTest('26. GET /api/admin/audit-logs (Security Audit Logs)', async () => {
    const res = await fetch(`${BASE_URL}/api/admin/audit-logs`, {
      headers: { Authorization: `Bearer ${adminToken}` },
    });
    const json = await res.json();
    if (!json.success) throw new Error(json.error?.message || 'Audit logs failed');
    return `Audit trail entries: ${json.data.length}`;
  });

  await runTest('27. GET /api/admin/broadcast (Public Global Banner)', async () => {
    const res = await fetch(`${BASE_URL}/api/admin/broadcast`);
    const json = await res.json();
    if (!json.success) throw new Error(json.error?.message || 'Broadcast get failed');
    return `Banner message: "${json.data.message}"`;
  });

  await runTest('28. POST /api/admin/broadcast (Admin Update Global Banner)', async () => {
    const res = await fetch(`${BASE_URL}/api/admin/broadcast`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${adminToken}`,
      },
      body: JSON.stringify({
        message: 'CodeSlot Verified: Senior, Intermediate & Junior developer matching is live!',
        active: true,
        type: 'success',
      }),
    });
    const json = await res.json();
    if (!json.success) throw new Error(json.error?.message || 'Broadcast set failed');
    return `Updated banner: "${json.data.message}" (Type: ${json.data.type})`;
  });

  await runTest('29. POST /api/admin/system/clear-cache (Admin Telemetry Cache Invalidation)', async () => {
    const res = await fetch(`${BASE_URL}/api/admin/system/clear-cache`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${adminToken}` },
    });
    const json = await res.json();
    if (!json.success) throw new Error(json.error?.message || 'Clear cache failed');
    return 'Telemetry cache purged successfully';
  });

  await runTest('30. POST /api/auth/logout (Secure Sign Out)', async () => {
    const res = await fetch(`${BASE_URL}/api/auth/logout`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${candidateToken}` },
    });
    const json = await res.json();
    if (!json.success) throw new Error(json.error?.message || 'Logout failed');
    return 'Session terminated successfully';
  });

  console.log('\n' + '='.repeat(70));
  const passed = results.filter((r) => r.status === 'PASS').length;
  const failed = results.filter((r) => r.status === 'FAIL').length;
  console.log(`🏁 TEST SUMMARY: ${passed}/${results.length} PASSED (${failed} FAILED)`);
  console.log('='.repeat(70));

  if (failed > 0) {
    process.exit(1);
  }
}

startSuite().catch((err) => {
  console.error('Fatal test error:', err);
  process.exit(1);
});
