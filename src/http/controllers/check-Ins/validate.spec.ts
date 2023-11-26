import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import request from 'supertest';
import { app } from '@/app';
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user';
import { prisma } from '@/lib/prisma';

describe('Validate check-in controller e2e', () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it('Should be able to validate a checkIn', async () => {
    const { token } = await createAndAuthenticateUser(app);

    const user = await prisma.user.findFirstOrThrow();

    const createdGym = await prisma.gym.create({
      data: {
        title: 'Academia do Zé',
        description: 'teste',
        phone: '123456789',
        latitude: -15.2480147,
        longitude: -59.3225057,
      },
    });

    let checkIn = await prisma.checkIn.create({
      data: {
        gym_Id: createdGym.id,
        user_Id: user.id,
      },
    });

    const response = await request(app.server)
      .patch(`/check-ins/${checkIn.id}/validate`)
      .set('Authorization', `Bearer ${token}`)
      .send();

    expect(response.statusCode).toEqual(204);

    checkIn = await prisma.checkIn.findFirstOrThrow({
      where: {
        id: checkIn.id,
      },
    });

    expect(checkIn.validate_at).toEqual(expect.any(Date));
  });
});
