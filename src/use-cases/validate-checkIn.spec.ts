import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-checkIns-repository';
import { CheckInValidateUseCase } from './validate-checkIn';
import { ResourceNotFoundError } from './errors/resource-not-found';

let checkInRepository: InMemoryCheckInsRepository;
let sut: CheckInValidateUseCase;

describe('Validate check-in useCase', () => {
  beforeEach(async () => {
    checkInRepository = new InMemoryCheckInsRepository();
    sut = new CheckInValidateUseCase(checkInRepository);
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('Should not be able to validate inexistent checkIn', async () => {
    expect(
      async () =>
        await sut.execute({
          checkInId: 'inexistent-checkIn-Id',
        })
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });

  it('Should be able to validate checkIn', async () => {
    const createdCheckIn = await checkInRepository.create({
      user_Id: 'userId-01',
      gym_Id: 'gymId-01',
    });

    const { checkIn } = await sut.execute({
      checkInId: createdCheckIn.id,
    });

    expect(checkIn.validate_at).toEqual(expect.any(Date));
    expect(checkInRepository.items[0].validate_at).toEqual(expect.any(Date));
  });

  it('Should not be able to validate the check-in after 20 minutes of its creation', async () => {
    vi.setSystemTime(new Date(2023, 0, 1, 13, 40));

    const createdCheckIn = await checkInRepository.create({
      user_Id: 'userId-01',
      gym_Id: 'gymId-01',
    });

    const twentyOneMinutesInMiliseconds = 1000 * 60 * 21;

    vi.advanceTimersByTime(twentyOneMinutesInMiliseconds);

    expect(
      async () =>
        await sut.execute({
          checkInId: 'inexistent-checkIn-Id',
        })
    ).rejects.toBeInstanceOf(Error);
  });
});
