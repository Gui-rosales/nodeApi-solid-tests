import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-checkIns-repository';
import { CheckInUseCase } from './checkIn';
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository';
import { Decimal } from '@prisma/client/runtime/library';

let checkInRepository: InMemoryCheckInsRepository;
let gymsRepository: InMemoryGymsRepository;
let sut: CheckInUseCase;

describe('Check-in useCase', () => {
  beforeEach(async () => {
    checkInRepository = new InMemoryCheckInsRepository();
    gymsRepository = new InMemoryGymsRepository();
    sut = new CheckInUseCase(checkInRepository, gymsRepository);

    await gymsRepository.create({
      id: 'gymId-01',
      title: 'javascript Gym',
      description: 'A melhor academia para aprendet JS',
      phone: '65912312312',
      latitude: -15.2480147,
      longitude: -59.3225057,
    });
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('Should be able to checkIn', async () => {
    const { checkIn } = await sut.execute({
      userId: 'userId-01',
      gymId: 'gymId-01',
      userLatitude: -15.2480147,
      userLongitude: -59.3225057,
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });

  it('Should not be able to checkIn twice in the same day', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0));
    await sut.execute({
      userId: 'userId-01',
      gymId: 'gymId-01',
      userLatitude: -15.2480147,
      userLongitude: -59.3225057,
    });

    await expect(() =>
      sut.execute({
        userId: 'userId-01',
        gymId: 'gymId-01',
        userLatitude: -15.2480147,
        userLongitude: -59.3225057,
      })
    ).rejects.toBeInstanceOf(Error);
  });

  it('Should be able to checkIn twice but in different days', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0));

    await sut.execute({
      userId: 'userId-01',
      gymId: 'gymId-01',
      userLatitude: -15.2480147,
      userLongitude: -59.3225057,
    });

    vi.setSystemTime(new Date(2022, 0, 21, 8, 0, 0));

    const { checkIn } = await sut.execute({
      userId: 'userId-01',
      gymId: 'gymId-01',
      userLatitude: -15.2480147,
      userLongitude: -59.3225057,
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });

  it('Should not be able to checkIn if user is far away from the gym', async () => {
    gymsRepository.items.push({
      id: 'gymId-02',
      title: 'Javascript Gym 2',
      description: 'dawdasd',
      phone: '',
      latitude: new Decimal(-15.2480147),
      longitude: new Decimal(-59.3225057),
    });

    await expect(() =>
      sut.execute({
        userId: 'user-01',
        gymId: 'gymId-02',
        userLatitude: -15.160585,
        userLongitude: -59.3133231,
      })
    ).rejects.toBeInstanceOf(Error);
  });
});

//eu sempre quero testar a aplicação de maneira independente de suas dependências
//teste unitário nunca vai tocar em banco de dados
