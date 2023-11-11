import { CheckIn, Prisma } from '@prisma/client';
import { CheckInsRepository } from '../checkIns-repository';
import { randomUUID } from 'node:crypto';
import dayjs from 'dayjs';

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

  async findByUserIdOnDate(userId: string, date: Date) {
    const startOfTheDay = dayjs(date).startOf('date');
    const endOfTheDay = dayjs(date).endOf('date');

    const checkInOnSameDate = this.items.find((checkIn) => {
      const checkinDate = dayjs(checkIn.created_at);
      const isOnSameDate =
        checkinDate.isAfter(startOfTheDay) && checkinDate.isBefore(endOfTheDay);

      return checkIn.user_Id === userId && isOnSameDate;
    });

    if (!checkInOnSameDate) {
      return null;
    }

    return checkInOnSameDate;
  }

  async findManyByUserId(
    userId: string,
    page: number
  ): Promise<CheckIn[] | null> {
    const checkIns = this.items
      .filter((checkIn) => checkIn.user_Id === userId)
      .slice((page - 1) * 20, 40);
    return checkIns;
  }
}
