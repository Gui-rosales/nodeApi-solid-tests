import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-checkIns-repository';
import { CheckInUseCase } from '../checkIn';
import { PrismaGymRepository } from '@/repositories/prisma/prisma-gym-repository';

export function makeCheckInUseCase() {
  const prismaCheckInRepository = new PrismaCheckInsRepository();
  const prismaGymsRepository = new PrismaGymRepository();
  const useCase = new CheckInUseCase(
    prismaCheckInRepository,
    prismaGymsRepository
  );

  return useCase;
}
