import { Gym, Prisma } from '@prisma/client';
import { GymsRepository } from '../gyms-repository';
import { randomUUID } from 'crypto';

export class InMemoryGymsRepository implements GymsRepository {
  public items: Gym[] = [];

  async findById(id: string): Promise<Gym | null> {
    const gym = this.items.find((item) => item.id === id);
    if (!gym) {
      return null;
    }
    return gym;
  }

  async create(data: Prisma.GymCreateInput) {
    const gym = {
      id: data.id ?? randomUUID(),
      title: data.title,
      description: data.description ?? null,
      phone: data.phone ?? null,
      latitude: new Prisma.Decimal(data.latitude.toString()),
      longitude: new Prisma.Decimal(data.longitude.toString()),
    };
    this.items.push(gym);

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
