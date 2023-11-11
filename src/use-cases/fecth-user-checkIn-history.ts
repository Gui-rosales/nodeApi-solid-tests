import { CheckInsRepository } from '@/repositories/checkIns-repository';
import { CheckIn } from '@prisma/client';
import { ResourceNotFoundError } from './errors/resource-not-found';

interface FecthUserCheckInHistoryUseCaseRequest {
  userId: string;
  page: number;
}

interface FecthUserCheckInHistoryUseCaseResponse {
  checkIns: CheckIn[];
}

export class FecthUserCheckInHistoryUseCase {
  constructor(private checkInsRepository: CheckInsRepository) {}

  async execute({
    userId,
    page,
  }: FecthUserCheckInHistoryUseCaseRequest): Promise<FecthUserCheckInHistoryUseCaseResponse> {
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
