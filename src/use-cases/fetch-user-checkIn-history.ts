import { CheckInsRepository } from '@/repositories/checkIns-repository';
import { CheckIn } from '@prisma/client';
import { ResourceNotFoundError } from './errors/resource-not-found';

interface FetchUserCheckInHistoryUseCaseRequest {
  userId: string;
  page: number;
}

interface FetchUserCheckInHistoryUseCaseResponse {
  checkIns: CheckIn[];
}

export class FetchUserCheckInHistoryUseCase {
  constructor(private checkInsRepository: CheckInsRepository) {}

  async execute({
    userId,
    page,
  }: FetchUserCheckInHistoryUseCaseRequest): Promise<FetchUserCheckInHistoryUseCaseResponse> {
    const checkIns = await this.checkInsRepository.findManyByUserId(
      userId,
      page
    );
    if (!checkIns) {
      throw new ResourceNotFoundError();
    }
    return {
      checkIns,
    };
  }
}
