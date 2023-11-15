import { PrismaGymRepository } from '@/repositories/prisma/prisma-gym-repository';
import { SearchGymsUseCase } from '../search-gyms';

export function makeSearchGymsUseCase() {
  const prismaGymsRepository = new PrismaGymRepository();
  const useCase = new SearchGymsUseCase(prismaGymsRepository);
  return useCase;
}
