import { beforeEach, describe, expect, it } from 'vitest';
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-checkIns-repository';
import { CheckInUseCase } from './checkIn';

let checkInRepository: InMemoryCheckInsRepository;
let sut: CheckInUseCase;

describe('Check-in useCase', () => {
  beforeEach(() => {
    checkInRepository = new InMemoryCheckInsRepository();
    sut = new CheckInUseCase(checkInRepository);
  });

  it('Should be able to checkIn', async () => {
    const { checkIn } = await sut.execute({
      userId: 'userId-01',
      gymId: 'gymId-01',
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });
});

//eu sempre quero testar a aplicação de maneira independente de suas dependências
//teste unitário nunca vai tocar em banco de dados
