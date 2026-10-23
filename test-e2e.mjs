// Node.js E2E API Verification Script
const BASE_URL = 'http://localhost:5000';

async function test() {
  console.log('Testing CodeSlot Endpoints...\n');

  // 1. Health
  const healthRes = await fetch(`${BASE_URL}/health`);
  console.log('1. GET /health:', healthRes.status, await healthRes.json());

  // 2. Admin Login
  const loginRes = await fetch(`${BASE_URL}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@gmail.com', password: 'admin1122' }),
  });
  const loginData = await loginRes.json();
  console.log('2. POST /api/auth/login (Admin):', loginRes.status, loginData.success ? `OK (User: ${loginData.data.user.name}, Role: ${loginData.data.user.role})` : loginData);

  const adminToken = loginData.data?.token;

  if (adminToken) {
    // 3. Admin Me
    const meRes = await fetch(`${BASE_URL}/api/auth/me`, {
      headers: { Authorization: `Bearer ${adminToken}` },
    });
    console.log('3. GET /api/auth/me:', meRes.status, (await meRes.json()).data?.user?.email);

    // 4. Admin Stats
    const statsRes = await fetch(`${BASE_URL}/api/admin/stats`, {
      headers: { Authorization: `Bearer ${adminToken}` },
    });
    console.log('4. GET /api/admin/stats:', statsRes.status, (await statsRes.json()).data);

    // 5. Admin Users
    const usersRes = await fetch(`${BASE_URL}/api/admin/users`, {
      headers: { Authorization: `Bearer ${adminToken}` },
    });
    const usersData = await usersRes.json();
    console.log('5. GET /api/admin/users:', usersRes.status, `Total users: ${usersData.data?.length}`);

    // 6. Admin Activities
    const actRes = await fetch(`${BASE_URL}/api/admin/activities`, {
      headers: { Authorization: `Bearer ${adminToken}` },
    });
    console.log('6. GET /api/admin/activities:', actRes.status, `Activities: ${(await actRes.json()).data?.length}`);

    // 7. Admin Broadcast GET & POST
    const broadcastRes = await fetch(`${BASE_URL}/api/admin/broadcast`);
    console.log('7. GET /api/admin/broadcast:', broadcastRes.status, await broadcastRes.json());
  }

  // 8. Public Jobs
  const jobsRes = await fetch(`${BASE_URL}/api/jobs?limit=5`);
  const jobsData = await jobsRes.json();
  console.log('8. GET /api/jobs:', jobsRes.status, `Loaded jobs: ${jobsData.data?.jobs?.length}, total: ${jobsData.data?.total}`);

  // 9. Candidate Demo Login
  const demoRes = await fetch(`${BASE_URL}/api/auth/demo-login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ role: 'candidate' }),
  });
  const demoData = await demoRes.json();
  console.log('9. POST /api/auth/demo-login:', demoRes.status, demoData.data?.user?.name);
}

test().catch(console.error);
