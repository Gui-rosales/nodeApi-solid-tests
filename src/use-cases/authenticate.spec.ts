import { beforeEach, describe, expect, it, test } from 'vitest';
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository';
import { AuthenticateUseCase } from './authenticate';
import { hash } from 'bcryptjs';
import { InvalidCredentialsError } from './errors/invalid-credentials-error';
import { UsersRepository } from '@/repositories/users-repository';

let usersRepository: UsersRepository;
let sut: AuthenticateUseCase;

describe('Authenticate useCase', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    sut = new AuthenticateUseCase(usersRepository);
  });
  it('Should be able to authenticate', async () => {
    await usersRepository.create({
      name: 'John Doe',
      email: 'johndoe@email.com',
      password_hash: await hash('password123', 10),
    });

    const { user } = await sut.execute({
      email: 'johndoe@email.com',
      password: 'password123',
    });

    expect(user.id).toEqual(expect.any(String));
  });

  it('Should not be able to authenticate with wrong email', async () => {
    await expect(() =>
      sut.execute({
        email: 'johndoe@email.com',
        password: 'password123',
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });

  it('Should not be able to authenticate with wrong password', async () => {
    await usersRepository.create({
      name: 'John Doe',
      email: 'johndoe@email.com',
      password_hash: await hash('password123', 10),
    });

    await expect(() =>
      sut.execute({
        email: 'johndoe@email.com',
        password: 'passwor678',
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });
});
