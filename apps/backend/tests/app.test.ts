import { describe, it, expect } from 'vitest';
import request from 'supertest';
import { app } from '../src/app.js';

describe('Backend Application Health & Infrastructure Routes', () => {
  it('GET /health returns 200 and valid health payload', async () => {
    const res = await request(app).get('/health');
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('status');
    expect(res.body).toHaveProperty('service', 'codeslot-backend');
    expect(res.body).toHaveProperty('timestamp');
  });

  it('GET /api/health returns 200 and matches HealthStatus schema', async () => {
    const res = await request(app).get('/api/health');
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('service', 'codeslot-backend');
    expect(res.body).toHaveProperty('database');
  });

  it('GET /api/docs.json returns OpenAPI specification document', async () => {
    const res = await request(app).get('/api/docs.json');
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('openapi', '3.0.0');
    expect(res.body.info).toHaveProperty('title', 'CodeSlot Backend API');
  });

  it('GET /unknown-route returns 404 with error payload', async () => {
    const res = await request(app).get('/unknown-route');
    expect(res.status).toBe(404);
    expect(res.body).toHaveProperty('success', false);
    expect(res.body.error).toHaveProperty('code', 'NOT_FOUND');
  });
});
