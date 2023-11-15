import { Gym } from '@prisma/client';
import { ResourceNotFoundError } from './errors/resource-not-found';
import { GymsRepository } from '@/repositories/gyms-repository';

interface SearchGymsCaseRequest {
  query: string;
  page: number;
}

interface SearchGymsCaseResponse {
  gyms: Gym[];
}

export class SearchGymsUseCase {
  constructor(private gymsReposiory: GymsRepository) {}

  async execute({
    query,
    page,
  }: SearchGymsCaseRequest): Promise<SearchGymsCaseResponse> {
    const gyms = await this.gymsReposiory.searchMany(query, page);

    if (!gyms) {
      throw new ResourceNotFoundError();
    }

    return {
      gyms,
    };
  }
}
