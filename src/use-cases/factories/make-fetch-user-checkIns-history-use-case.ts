import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-checkIns-repository';
import { FetchUserCheckInHistoryUseCase } from '../fetch-user-checkIn-history';

export function makeFetchUserCheckInsHistoryUseCase() {
  const prismaCheckInsRepository = new PrismaCheckInsRepository();
  const useCase = new FetchUserCheckInHistoryUseCase(prismaCheckInsRepository);
  return useCase;
}
