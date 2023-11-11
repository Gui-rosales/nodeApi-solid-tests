import { beforeEach, describe, expect, it, test } from 'vitest';
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository';
import { hash } from 'bcryptjs';
import { UsersRepository } from '@/repositories/users-repository';
import { GetUserProfileUseCase } from './get-user-profile';
import { ResourceNotFoundError } from './errors/resource-not-found';

let usersRepository: UsersRepository;
let sut: GetUserProfileUseCase;

describe('Get user profile useCase', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    sut = new GetUserProfileUseCase(usersRepository);
  });

  it('Should be able to retrive an user with its ID', async () => {
    const createdUser = await usersRepository.create({
      name: 'John Doe',
      email: 'johndoe@email.com',
      password_hash: await hash('password123', 10),
    });

    const { user } = await sut.execute({
      userId: createdUser.id,
    });

    expect(user.name).toEqual('John Doe');
  });

  it('Should not be able to get user with wrong Id', async () => {
    await expect(() =>
      sut.execute({
        userId: 'non-existing-id',
      })
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
