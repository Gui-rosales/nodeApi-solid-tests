import { makeCreateGymUseCase } from '@/use-cases/factories/make-create-gym-use-case';
import { makeValidateCheckInUseCase } from '@/use-cases/factories/make-validate-checkIns-use-case';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

export async function validate(request: FastifyRequest, reply: FastifyReply) {
  const validateCheckInParamsSchema = z.object({
    checkInId: z.string(),
  });

  const { checkInId } = validateCheckInParamsSchema.parse(request.params);

  const validateCheckInUseCase = makeValidateCheckInUseCase();

  const { checkIn } = await validateCheckInUseCase.execute({
    checkInId,
  });

  return reply.status(204).send({
    checkIn,
  });
}
