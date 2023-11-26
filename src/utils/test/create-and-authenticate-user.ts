import request from 'supertest';
import { FastifyInstance } from 'fastify';

export async function createAndAuthenticateUser(app: FastifyInstance) {
  await request(app.server).post('/users').send({
    name: 'John Doe',
    email: 'jonhdoe.e2e@email.com',
    password: 'password123',
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
