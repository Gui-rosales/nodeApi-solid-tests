import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-checkIns-repository';
import { CheckInUseCase } from './checkIn';
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository';
import { Decimal } from '@prisma/client/runtime/library';

let checkInRepository: InMemoryCheckInsRepository;
let gymsRepository: InMemoryGymsRepository;
let sut: CheckInUseCase;

describe('Check-in useCase', () => {
  beforeEach(() => {
    checkInRepository = new InMemoryCheckInsRepository();
    gymsRepository = new InMemoryGymsRepository();
    sut = new CheckInUseCase(checkInRepository, gymsRepository);

    gymsRepository.items.push({
      id: 'gymId-01',
      title: 'Javascript Gym',
      description: 'dawdasd',
      phone: '',
      latitude: new Decimal(0),
      longitude: new Decimal(0),
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
      userLatitue: 0,
      userLongitute: 0,
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });

  it('Should not be able to checkIn twice in the same day', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0));
    await sut.execute({
      userId: 'userId-01',
      gymId: 'gymId-01',
      userLatitue: 0,
      userLongitute: 0,
    });

    await expect(() =>
      sut.execute({
        userId: 'userId-01',
        gymId: 'gymId-01',
        userLatitue: 0,
        userLongitute: 0,
      })
    ).rejects.toBeInstanceOf(Error);
  });

  it('Should be able to checkIn twice but in different days', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0));

    await sut.execute({
      userId: 'userId-01',
      gymId: 'gymId-01',
      userLatitue: 0,
      userLongitute: 0,
    });

    vi.setSystemTime(new Date(2022, 0, 21, 8, 0, 0));

    const { checkIn } = await sut.execute({
      userId: 'userId-01',
      gymId: 'gymId-01',
      userLatitue: 0,
      userLongitute: 0,
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });

  // it('Should not be able to checkIn if user is more than 100m away from the gym', async () => {
  //
  // });
});

//eu sempre quero testar a aplicação de maneira independente de suas dependências
//teste unitário nunca vai tocar em banco de dados
