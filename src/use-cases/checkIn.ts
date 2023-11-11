import { CheckInsRepository } from '@/repositories/checkIns-repository';
import { GymsRepository } from '@/repositories/gyms-repository';
import { CheckIn } from '@prisma/client';
import { ResourceNotFoundError } from './errors/resource-not-found';
import { getDistanceBetweenCoordinates } from '@/utils/get-distance-between-coordinates';
import { MaxDistanceError } from './errors/max-distance-error';
import { MaxCheckInsError } from './errors/max-number-of-checkIns-error';

interface CheckInUseCaseRequest {
  userId: string;
  gymId: string;
  userLatitude: number;
  userLongitude: number;
}

interface CheckInUseCaseResponse {
  checkIn: CheckIn;
}

export class CheckInUseCase {
  constructor(
    private checkInsRepository: CheckInsRepository,
    private gymsRepository: GymsRepository
  ) {}

  async execute({
    userId,
    gymId,
    userLatitude,
    userLongitude,
  }: CheckInUseCaseRequest): Promise<CheckInUseCaseResponse> {
    const MAX_DISTANCE_IN_KILOMETERS = 0.1;

    const gym = await this.gymsRepository.findById(gymId);

    if (!gym) {
      throw new ResourceNotFoundError();
    }

    const distance = getDistanceBetweenCoordinates(
      { latitude: userLatitude, longitude: userLongitude },
      { latitude: gym.latitude.toNumber(), longitude: gym.longitude.toNumber() }
    );

    if (distance > MAX_DISTANCE_IN_KILOMETERS) {
      throw new MaxDistanceError();
    }

    const checkInOnSameDay = await this.checkInsRepository.findByUserIdOnDate(
      userId,
      new Date()
    );

    if (checkInOnSameDay) {
      throw new MaxCheckInsError();
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
