import { CheckInsRepository } from '@/repositories/checkIns-repository';
import { UsersRepository } from '@/repositories/users-repository';
import { CheckIn } from '@prisma/client';

interface CheckInUseCaseRequest {
  userId: string;
  gymId: string;
}

interface CheckInUseCaseResponse {
  CheckIn: CheckIn;
}

export class CheckInUseCase {
  constructor(private checkInsRepository: CheckInsRepository) {}

  async execute({ userId, gymId }: CheckInUseCaseRequest) {
    const checkIn = await this.checkInsRepository.create({
      gym_Id: gymId,
      user_Id: userId,
    });

    return {
      checkIn,
    };
  }
}
