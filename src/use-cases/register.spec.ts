import { beforeEach, describe, expect, it, test } from 'vitest';
import { RegisterUseCase } from './register';
import { compare } from 'bcryptjs';
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository';
import { UserAlreadyExistsError } from './errors/user-already-exists-error';
import { UsersRepository } from '@/repositories/users-repository';

let usersRepository: UsersRepository;
let sut: RegisterUseCase;

describe('Register useCase', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    sut = new RegisterUseCase(usersRepository);
  });

  it('Should be able to register', async () => {
    const { user } = await sut.execute({
      name: 'John Doe',
      email: 'johndoe@email.com',
      password: 'password123',
    });

    expect(user.id).toEqual(expect.any(String));
  });

  it('Should hash user password upon registration', async () => {
    const { user } = await sut.execute({
      name: 'John Doe',
      email: 'johndoe@email.com',
      password: 'password123',
    });

    const isPasswordCorrectedHashed = await compare(
      'password123',
      user.password_hash
    );

    expect(isPasswordCorrectedHashed).toBe(true);
  });

  it('Should not be able to register with same email twice', async () => {
    const email = 'johndoe@email.com';

    await sut.execute({
      name: 'John Doe',
      email,
      password: 'password123',
    });

    await expect(() =>
      sut.execute({
        name: 'John Doe',
        email,
        password: 'password123',
      })
    ).rejects.toBeInstanceOf(UserAlreadyExistsError);
  });
});

//eu sempre quero testar a aplicação de maneira independente de suas dependências
//teste unitário nunca vai tocar em banco de dados
