import { verifyJwt } from '@/http/middlewares/verify-jwt';
import { FastifyInstance } from 'fastify';
import { nearby } from './nearby';
import { search } from './search';
import { create } from './create-gym';
import { verifyUserRole } from '@/http/middlewares/verifyUserRole';

export async function gymRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJwt);

  app.get('/gyms/nearby', nearby);
  app.get('/gyms/search', search);
  app.post('/gyms', { onRequest: [verifyUserRole('ADMIN')] }, create);
}
