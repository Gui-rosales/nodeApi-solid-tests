import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-checkIns-repository';
import { CheckInValidateUseCase } from '../validate-checkIn';

export function makeValidateCheckInUseCase() {
  const prismaCheckInsRepository = new PrismaCheckInsRepository();
  const useCase = new CheckInValidateUseCase(prismaCheckInsRepository);
  return useCase;
}
