import { Gym, Prisma } from '@prisma/client';

export interface GymsRepository {
  findById(id: string): Promise<Gym | null>;
  // create(data: Prisma.UserCreateInput): Promise<Gym>;
  //findByEmail(email: string): Promise<Gym | null>;
}
