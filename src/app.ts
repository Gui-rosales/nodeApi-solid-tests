import fastify from 'fastify';
import { ZodError } from 'zod';
import { userRoutes } from './http/controllers/users/routes';
import { env } from './env';
import fastifyJwt from '@fastify/jwt';
import { gymRoutes } from './http/controllers/gyms/routes';
import { checkInsRoutes } from './http/controllers/check-Ins/routes';
import fastifyCookie from '@fastify/cookie';

export const app = fastify();
app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  cookie: {
    cookieName: 'refreshToken',
    signed: false,
  },
  sign: {
    expiresIn: '1h',
  },
});

app.register(fastifyCookie);

app.register(userRoutes);
app.register(gymRoutes);
app.register(checkInsRoutes);

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    reply.status(400).send({
      message: 'Validation Error',
      issues: error.format(),
    });
  }

  if (env.NODE_ENV !== 'production') {
    console.error(error);
  } else {
    // Todo: here we should send the logs of the production app to a observability service: Datadog/newRelic/Sentry
  }

  return reply.status(500).send({ message: 'Internal Server Error' });
});
