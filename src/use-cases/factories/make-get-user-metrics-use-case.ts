import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-checkIns-repository';
import { GetUserMetrictsUseCase } from '../get-user-metrics';

export function makeGetUserMetricsUseCase() {
  const prismaCheckInsRepository = new PrismaCheckInsRepository();
  const useCase = new GetUserMetrictsUseCase(prismaCheckInsRepository);
  return useCase;
}
