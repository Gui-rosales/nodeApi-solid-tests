import { beforeEach, describe, expect, it, vi } from 'vitest';
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-checkIns-repository';
import { FetchUserCheckInHistoryUseCase } from './fetch-user-checkIn-history';

let checkInRepository: InMemoryCheckInsRepository;
let sut: FetchUserCheckInHistoryUseCase;

describe('Fetch user check-In history', () => {
  beforeEach(async () => {
    checkInRepository = new InMemoryCheckInsRepository();
    sut = new FetchUserCheckInHistoryUseCase(checkInRepository);
  });

  it('Should be able to retrieve checkIn history', async () => {
    await checkInRepository.create({
      gym_Id: 'gym-01',
      user_Id: 'user-01',
    });
    await checkInRepository.create({
      gym_Id: 'gym-02',
      user_Id: 'user-01',
    });

    const { checkIns } = await sut.execute({
      userId: 'user-01',
      page: 1,
    });

    expect(checkIns).toHaveLength(2);
    expect(checkIns).toEqual([
      expect.objectContaining({ gym_Id: 'gym-01' }),
      expect.objectContaining({ gym_Id: 'gym-02' }),
    ]);
  });

  it('Should be able to fetch paginated check-in history', async () => {
    for (let i = 1; i <= 22; i++) {
      await checkInRepository.create({
        gym_Id: `gym-${i}`,
        user_Id: 'user-01',
      });
    }

    const { checkIns } = await sut.execute({
      userId: 'user-01',
      page: 2,
    });

    expect(checkIns).toHaveLength(2);
    expect(checkIns).toEqual([
      expect.objectContaining({ gym_Id: 'gym-21' }),
      expect.objectContaining({ gym_Id: 'gym-22' }),
    ]);
  });
});
