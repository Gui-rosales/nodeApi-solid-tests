import { CheckInsRepository } from '@/repositories/checkIns-repository';
import { CheckIn } from '@prisma/client';
import { ResourceNotFoundError } from './errors/resource-not-found';
import dayjs from 'dayjs';
import { LateChekInValidationError } from './errors/late-checkIn-validation-error';

interface CheckInValidateUseCaseRequest {
  checkInId: string;
}

interface CheckInValidateUseCaseResponse {
  checkIn: CheckIn;
}

export class CheckInValidateUseCase {
  constructor(private checkInsRepository: CheckInsRepository) {}

  async execute({
    checkInId,
  }: CheckInValidateUseCaseRequest): Promise<CheckInValidateUseCaseResponse> {
    const checkIn = await this.checkInsRepository.findById(checkInId);

    if (!checkIn) {
      throw new ResourceNotFoundError();
    }

    const distanceInMinutesFromCheckInCreation = dayjs(new Date()).diff(
      checkIn.created_at,
      'minutes'
    );

    if (distanceInMinutesFromCheckInCreation > 20) {
      throw new LateChekInValidationError();
    }

    checkIn.validate_at = new Date();

    await this.checkInsRepository.save(checkIn);

    return {
      checkIn,
    };
  }
}
