import { CheckInsRepository } from '@/repositories/checkIns-repository';
import { CheckIn } from '@prisma/client';
import { ResourceNotFoundError } from './errors/resource-not-found';

interface GetUserMetrictsUseCaseRequest {
  userId: string;
}

interface GetUserMetrictsUseCaseResponse {
  checkInsCount: number;
}

export class GetUserMetrictsUseCase {
  constructor(private checkInsRepository: CheckInsRepository) {}

  async execute({
    userId,
  }: GetUserMetrictsUseCaseRequest): Promise<GetUserMetrictsUseCaseResponse> {
    const checkInsCount = await this.checkInsRepository.countByUserId(userId);
    if (!checkInsCount) {
      throw new ResourceNotFoundError();
    }
    return {
      checkInsCount,
    };
  }
}
