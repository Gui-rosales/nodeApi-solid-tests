import { beforeEach, describe, expect, it, vi } from 'vitest';
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-checkIns-repository';
import { GetUserMetrictsUseCase } from './get-user-metrics';

let checkInRepository: InMemoryCheckInsRepository;
let sut: GetUserMetrictsUseCase;

describe('Get user metrics use case', () => {
  beforeEach(async () => {
    checkInRepository = new InMemoryCheckInsRepository();
    sut = new GetUserMetrictsUseCase(checkInRepository);
  });

  it('Should be able to retrieve checkIn count', async () => {
    await checkInRepository.create({
      gym_Id: 'gym-01',
      user_Id: 'user-01',
    });
    await checkInRepository.create({
      gym_Id: 'gym-02',
      user_Id: 'user-01',
    });

    const { checkInsCount } = await sut.execute({
      userId: 'user-01',
    });

    expect(checkInsCount).toEqual(2);
  });
});
