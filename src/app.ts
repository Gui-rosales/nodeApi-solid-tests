import fastify from 'fastify';
import { ZodError } from 'zod';
import { appRoutes } from './http/routes';
import { env } from './env';
import fastifyJwt from '@fastify/jwt';

export const app = fastify();
app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
});
app.register(appRoutes);

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
