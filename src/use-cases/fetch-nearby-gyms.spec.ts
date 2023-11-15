import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository';
import { beforeEach, describe, expect, it } from 'vitest';
import { FetchNearbyGymUseCase } from './fetch-nearby-gyms';

let gymsReposiory: InMemoryGymsRepository;
let sut: FetchNearbyGymUseCase;

describe('Fetch nearby gyms use case', () => {
  beforeEach(async () => {
    gymsReposiory = new InMemoryGymsRepository();
    sut = new FetchNearbyGymUseCase(gymsReposiory);
  });

  it('Should be able fetch nearby gyms', async () => {
    await gymsReposiory.create({
      title: 'Near gym',
      description: 'Description for test',
      phone: '65912312312',
      latitude: -15.2480147,
      longitude: -59.3225057,
    });

    await gymsReposiory.create({
      title: 'Far gym',
      description: 'Description for test',
      phone: '65912312312',
      latitude: -15.4490941,
      longitude: -59.0965917,
    });

    const { gyms } = await sut.execute({
      userLatitude: -15.2480147,
      userLongitude: -59.3225057,
    });

    expect(gyms).toHaveLength(1);
    expect(gyms).toEqual([expect.objectContaining({ title: 'Near gym' })]);
  });
});
