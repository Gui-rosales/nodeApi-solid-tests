import { makeFetchUserCheckInsHistoryUseCase } from '@/use-cases/factories/make-fetch-user-checkIns-history-use-case';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

export async function history(request: FastifyRequest, reply: FastifyReply) {
  const searchUserCheckInHistory = z.object({
    page: z.coerce.number().positive().default(1),
  });

  const { page } = searchUserCheckInHistory.parse(request.params);

  const fetchUserCheckInHistory = makeFetchUserCheckInsHistoryUseCase();

  const { checkIns } = await fetchUserCheckInHistory.execute({
    userId: request.user.sub,
    page,
  });

  return reply.status(200).send({
    checkIns,
  });
}
