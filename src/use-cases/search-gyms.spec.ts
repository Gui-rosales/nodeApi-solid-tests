import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository';
import { beforeEach, describe, expect, it } from 'vitest';
import { SearchGymsUseCase } from './search-gyms';

let gymsReposiory: InMemoryGymsRepository;
let sut: SearchGymsUseCase;

describe('Search gyms use case', () => {
  beforeEach(async () => {
    gymsReposiory = new InMemoryGymsRepository();
    sut = new SearchGymsUseCase(gymsReposiory);
  });

  it('Should be able search for gyms', async () => {
    await gymsReposiory.create({
      title: 'Test Gym 01',
      description: 'Description for test',
      phone: '65912312312',
      latitude: -15.2480147,
      longitude: -59.3225057,
    });

    await gymsReposiory.create({
      title: 'Test Gym 02',
      description: 'Description for test',
      phone: '65912312312',
      latitude: -15.2480547,
      longitude: -59.3223057,
    });

    const { gyms } = await sut.execute({
      query: 'Test Gym 01',
      page: 1,
    });

    expect(gyms).toHaveLength(1);
    expect(gyms).toEqual([expect.objectContaining({ title: 'Test Gym 01' })]);
  });

  it('Should be able to fetch paginated gyms search', async () => {
    for (let i = 1; i <= 22; i++) {
      await gymsReposiory.create({
        title: `TestGym ${i}`,
        description: null,
        phone: '65912312312',
        latitude: -15.2480547,
        longitude: -59.3223057,
      });
    }

    const { gyms } = await sut.execute({
      query: 'TestGym',
      page: 2,
    });

    expect(gyms).toHaveLength(2);
    expect(gyms).toEqual([
      expect.objectContaining({ title: 'TestGym 21' }),
      expect.objectContaining({ title: 'TestGym 22' }),
    ]);
  });
});
