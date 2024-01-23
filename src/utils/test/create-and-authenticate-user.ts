import request from 'supertest';
import { FastifyInstance } from 'fastify';
import { prisma } from '@/lib/prisma';
import { hash } from 'bcryptjs';

export async function createAndAuthenticateUser(
  app: FastifyInstance,
  isAdmin = false
) {
  await prisma.user.create({
    data: {
      name: 'Jonh Doe',
      email: 'jonhdoe.e2e@email.com',
      password_hash: await hash('password123', 10),
      role: isAdmin ? 'ADMIN' : 'MEMBER',
    },
  });
  const authResponse = await request(app.server).post('/sessions').send({
    email: 'jonhdoe.e2e@email.com',
    password: 'password123',
  });

  const { token } = authResponse.body;

  return {
    token,
  };
}
