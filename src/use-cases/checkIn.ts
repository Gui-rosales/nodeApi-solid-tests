import { CheckInsRepository } from '@/repositories/checkIns-repository';
import { GymsRepository } from '@/repositories/gyms-repository';
import { UsersRepository } from '@/repositories/users-repository';
import { CheckIn } from '@prisma/client';
import { ResourceNotFoundError } from './errors/resource-not-found';

interface CheckInUseCaseRequest {
  userId: string;
  gymId: string;
  userLatitue: number;
  userLongitute: number;
}

interface CheckInUseCaseResponse {
  CheckIn: CheckIn;
}

export class CheckInUseCase {
  constructor(
    private checkInsRepository: CheckInsRepository,
    private gymsRepository: GymsRepository
  ) {}

  async execute({ userId, gymId }: CheckInUseCaseRequest) {
    const gym = await this.gymsRepository.findById(gymId);

    if (!gym) {
      throw new ResourceNotFoundError();
    }

    const checkInOnSameDay = await this.checkInsRepository.findByUserIdOnDate(
      userId,
      new Date()
    );

    if (checkInOnSameDay) {
      throw new Error();
    }

    const checkIn = await this.checkInsRepository.create({
      gym_Id: gymId,
      user_Id: userId,
    });

    return {
      checkIn,
    };
  }
}
