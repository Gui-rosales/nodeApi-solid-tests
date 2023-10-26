import { Gym } from '@prisma/client';
import { GymsRepository } from '../gyms-repository';

export class InMemoryGymsRepository implements GymsRepository {
  public items: Gym[] = [];

  async findById(id: string): Promise<Gym | null> {
    const gym = this.items.find((item) => item.id === id);
    if (!gym) {
      return null;
    }
    return gym;
  }

  //   async findByEmail(email: string) {
  //     const user = this.items.find((user) => user.email === email);
  //     if (!user) {
  //       return null;
  //     }
  //     return user;
  //   }

  //   async create(data: Prisma.UserCreateInput) {
  //     const user = {
  //       id: randomUUID(),
  //       name: data.name,
  //       email: data.email,
  //       password_hash: data.password_hash,
  //       created_at: new Date(),
  //     };
  //     this.items.push(user);

  //     return user;
  //   }
}
