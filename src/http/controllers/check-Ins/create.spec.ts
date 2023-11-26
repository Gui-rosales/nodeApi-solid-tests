import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import request from 'supertest';
import { app } from '@/app';
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user';
import { prisma } from '@/lib/prisma';

describe('Create check-in controller e2e', () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it('Should be able to check-in gym', async () => {
    const { token } = await createAndAuthenticateUser(app);

    const createdGym = await prisma.gym.create({
      data: {
        title: 'Academia do Zé',
        description: 'teste',
        phone: '123456789',
        latitude: -15.2480147,
        longitude: -59.3225057,
      },
    });

    const response = await request(app.server)
      .post(`/gyms/${createdGym.id}/check-ins`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        latitude: -15.2480147,
        longitude: -59.3225057,
      });

    expect(response.statusCode).toEqual(201);
  });
});
