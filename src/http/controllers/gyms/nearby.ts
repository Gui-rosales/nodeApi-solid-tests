import { makeFetchNearbyGymsUseCase } from '@/use-cases/factories/make-fetch-nearby-gyms-use-case';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

export async function nearby(request: FastifyRequest, reply: FastifyReply) {
  const nearbyGymSchema = z.object({
    latitude: z.coerce.number().refine((value) => {
      return value >= -90 && value <= 90;
    }),
    longitude: z.coerce.number().refine((value) => {
      return value >= -180 && value <= 180;
    }),
  });

  const { latitude, longitude } = nearbyGymSchema.parse(request.query);

  const fetchNearbyGymsUseCase = makeFetchNearbyGymsUseCase();

  const { gyms } = await fetchNearbyGymsUseCase.execute({
    userLatitude: latitude,
    userLongitude: longitude,
  });

  return reply.status(200).send({
    gyms,
  });
}
