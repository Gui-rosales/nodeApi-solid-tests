import { PrismaGymRepository } from '@/repositories/prisma/prisma-gym-repository';
import { CreateGymUseCase } from '../create-gym';

export function makeCreateGymUseCase() {
  const prismaGymsRepository = new PrismaGymRepository();
  const useCase = new CreateGymUseCase(prismaGymsRepository);
  return useCase;
}
