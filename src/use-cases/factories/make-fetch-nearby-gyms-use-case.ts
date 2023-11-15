import { PrismaGymRepository } from '@/repositories/prisma/prisma-gym-repository';
import { FetchNearbyGymUseCase } from '../fetch-nearby-gyms';

export function makeFetchNearbyGymsUseCase() {
  const prismaGymsReposiory = new PrismaGymRepository();
  const useCase = new FetchNearbyGymUseCase(prismaGymsReposiory);
  return useCase;
}
