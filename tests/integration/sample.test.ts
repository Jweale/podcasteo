import request from 'supertest';

describe('Jobs API Integration Test', () => {
  it('should create a new job and transcript', async () => {
    const payload = {
      title: 'Test Job',
      text_md: 'This is a test transcript.',
      language: 'en',
    };
    const res = await request('http://localhost:3000')
      .post('/api/jobs')
      .send(payload)
      .set('Accept', 'application/json');
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('job_id');
  });
}); 