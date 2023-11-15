import { Gym } from '@prisma/client';
import { ResourceNotFoundError } from './errors/resource-not-found';
import { GymsRepository } from '@/repositories/gyms-repository';

interface FetchNearbyGymCaseRequest {
  userLatitude: number;
  userLongitude: number;
}

interface FetchNearbyGymCaseResponse {
  gyms: Gym[];
}

export class FetchNearbyGymUseCase {
  constructor(private gymsReposiory: GymsRepository) {}

  async execute({
    userLatitude,
    userLongitude,
  }: FetchNearbyGymCaseRequest): Promise<FetchNearbyGymCaseResponse> {
    const gyms = await this.gymsReposiory.findManyNearby({
      latitude: userLatitude,
      longitude: userLongitude,
    });

    if (!gyms) {
      throw new ResourceNotFoundError();
    }

    return {
      gyms,
    };
  }
}
