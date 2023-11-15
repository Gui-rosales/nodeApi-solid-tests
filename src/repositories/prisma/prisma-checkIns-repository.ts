import { Prisma, CheckIn } from '@prisma/client';
import { CheckInsRepository } from '../checkIns-repository';
import { prisma } from '@/lib/prisma';
import dayjs from 'dayjs';

export class PrismaCheckInsRepository implements CheckInsRepository {
  constructor() {}
  async create(data: Prisma.CheckInUncheckedCreateInput) {
    const checkIn = await prisma.checkIn.create({
      data,
    });
    return checkIn;
  }
  async findByUserIdOnDate(userId: string, date: Date) {
    const startOfTheDay = dayjs(date).startOf('date');
    const endOfTheDay = dayjs(date).endOf('date');

    const checkIn = await prisma.checkIn.findFirst({
      where: {
        user_Id: userId,
        created_at: {
          gte: startOfTheDay.toDate(),
          lte: endOfTheDay.toDate(),
        },
      },
    });
    return checkIn;
  }
  async findManyByUserId(userId: string, page: number) {
    const checkIns = await prisma.checkIn.findMany({
      where: {
        user_Id: userId,
      },
      take: 20,
      skip: (page - 1) * 20,
    });
    return checkIns;
  }
  async countByUserId(userId: string) {
    const count = await prisma.checkIn.count({
      where: {
        user_Id: userId,
      },
    });
    return count;
  }
  async findById(checkInId: string) {
    const checkIn = await prisma.checkIn.findUnique({
      where: {
        id: checkInId,
      },
    });
    return checkIn;
  }
  async save(checkIn: CheckIn) {
    const newCheckIn = await prisma.checkIn.update({
      where: {
        id: checkIn.id,
      },
      data: {
        ...checkIn,
      },
    });
    return newCheckIn;
  }
}
