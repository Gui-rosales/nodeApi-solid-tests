import { beforeEach, describe, expect, it, test } from 'vitest';
import { GymsRepository } from '@/repositories/gyms-repository';
import { CreateGymUseCase } from './create-gym';
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository';

let gymsRepository: GymsRepository;
let sut: CreateGymUseCase;

describe('Create Gym use case', () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository();
    sut = new CreateGymUseCase(gymsRepository);
  });

  it('Should be able to register', async () => {
    const { gym } = await sut.execute({
      title: 'javascript Gym',
      description: 'A melhor academia para aprendet JS',
      phone: '65912312312',
      latitude: -15.2480147,
      longitude: -59.3225057,
    });

    expect(gym.id).toEqual(expect.any(String));
  });

  //   it('Should hash user password upon registration', async () => {
  //     const { user } = await sut.execute({
  //       name: 'John Doe',
  //       email: 'johndoe@email.com',
  //       password: 'password123',
  //     });

  //     const isPasswordCorrectedHashed = await compare(
  //       'password123',
  //       user.password_hash
  //     );

  //     expect(isPasswordCorrectedHashed).toBe(true);
  //   });

  //   it('Should not be able to register with same email twice', async () => {
  //     const email = 'johndoe@email.com';

  //     await sut.execute({
  //       name: 'John Doe',
  //       email,
  //       password: 'password123',
  //     });

  //     await expect(() =>
  //       sut.execute({
  //         name: 'John Doe',
  //         email,
  //         password: 'password123',
  //       })
  //     ).rejects.toBeInstanceOf(UserAlreadyExistsError);
  //   });
});
