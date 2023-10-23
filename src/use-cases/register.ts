import { UsersRepository } from '@/repositories/users-repository';
import { hash } from 'bcryptjs';
import { UserAlreadyExistsError } from './errors/user-already-exists-error';
import { User } from '@prisma/client';

interface registerUseCaseRequest {
  name: string;
  email: string;
  password: string;
}

interface registerUseCaseResponse {
  user: User;
}

export class RegisterUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({ name, email, password }: registerUseCaseRequest) {
    const password_hash = await hash(password, 10);

    const userWithEmail = await this.usersRepository.findByEmail(email);

    if (userWithEmail) {
      throw new UserAlreadyExistsError();
    }

    const user = await this.usersRepository.create({
      name,
      email,
      password_hash,
    });

    return {
      user,
    };
  }
}
