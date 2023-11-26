import { makeCheckInUseCase } from '@/use-cases/factories/make-checkIn-use-case';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

export async function checkIn(request: FastifyRequest, reply: FastifyReply) {
  const createCheckInBodyShema = z.object({
    latitude: z.number().refine((value) => {
      return value >= -90 && value <= 90;
    }),
    longitude: z.number().refine((value) => {
      return value >= -180 && value <= 180;
    }),
  });

  const createCheckInParamsShema = z.object({
    gymId: z.string(),
  });

  const { latitude, longitude } = createCheckInBodyShema.parse(request.body);
  const { gymId } = createCheckInParamsShema.parse(request.params);

  const checkInUseCase = makeCheckInUseCase();

  await checkInUseCase.execute({
    gymId,
    userId: request.user.sub,
    userLatitude: latitude,
    userLongitude: longitude,
  });

  return reply.status(201).send();
}
