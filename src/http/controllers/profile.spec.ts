import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import request from 'supertest';
import { app } from '@/app';

describe('Profile controller e2e', () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it('Should be able to get user Profile', async () => {
    await request(app.server).post('/users').send({
      name: 'John Doe',
      email: 'jonhdoe.e2e@email.com',
      password: 'password123',
    });

    const authResponse = await request(app.server).post('/sessions').send({
        email: 'jonhdoe.e2e@email.com',
        password: 'password123',
    });
      
    const { token } = authResponse.body
    const profileReponse = await request(app.server).get('/me').set('Authorization', `Bearer ${token}`).send();
   
    expect(profileReponse.statusCode).toEqual(200);
    expect(profileReponse.body.user).toEqual(expect.objectContaining({
        email: 'jonhdoe.e2e@email.com',
    }))
  });
});
