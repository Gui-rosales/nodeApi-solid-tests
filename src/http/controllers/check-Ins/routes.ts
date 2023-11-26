import { verifyJwt } from '@/http/middlewares/verify-jwt';
import { FastifyInstance } from 'fastify';
import { checkIn } from './check-in';
import { metrics } from './metrics';
import { validate } from './validate';
import { history } from './history';

export async function checkInsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJwt);

  app.get('/check-ins/metrics', metrics);
  app.get('/check-ins/history', history);
  app.post('/gyms/:gymId/check-ins', checkIn);
  app.patch('/check-ins/:checkInId/validate', validate);
}
