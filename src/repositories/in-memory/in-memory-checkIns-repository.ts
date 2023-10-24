import { CheckIn, Prisma } from '@prisma/client';
import { CheckInsRepository } from '../checkIns-repository';
import { randomUUID } from 'node:crypto';

export class InMemoryCheckInsRepository implements CheckInsRepository {
  public items: CheckIn[] = [];
  async create(data: Prisma.CheckInUncheckedCreateInput) {
    const checkIn = {
      id: randomUUID(),
      created_at: new Date(),
      validate_at: data.validate_at ? new Date(data.validate_at) : null,
      user_Id: data.user_Id,
      gym_Id: data.gym_Id,
    };
    this.items.push(checkIn);

    return checkIn;
  }
}
