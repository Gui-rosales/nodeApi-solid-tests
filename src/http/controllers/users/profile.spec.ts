import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import request from 'supertest';
import { app } from '@/app';
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user';

describe('Profile controller e2e', () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it('Should be able to get user Profile', async () => {
    const { token } = await createAndAuthenticateUser(app);

    const profileReponse = await request(app.server)
      .get('/me')
      .set('Authorization', `Bearer ${token}`)
      .send();

    expect(profileReponse.statusCode).toEqual(200);
    expect(profileReponse.body.user).toEqual(
      expect.objectContaining({
        email: 'jonhdoe.e2e@email.com',
      })
    );
  });
});
