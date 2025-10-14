import { prisma } from '../lib/prisma.js';
import { User as PrismaUser } from '@prisma/client';
import {
  UserCreateData,
  UserUpdateData,
  UserFindOptions,
  UserPagination,
  UserFindAllResult
} from '../types/index.js';

export class User {
  static async findById(id: string | number): Promise<PrismaUser | null> {
    return await prisma.user.findUnique({
      where: { id: parseInt(id.toString()) }
    });
  }

  static async findByEmail(email: string): Promise<PrismaUser | null> {
    return await prisma.user.findUnique({
      where: { email }
    });
  }

  static async create(data: UserCreateData): Promise<PrismaUser> {
    return await prisma.user.create({
      data
    });
  }

  static async update(id: string | number, data: UserUpdateData): Promise<PrismaUser> {
    return await prisma.user.update({
      where: { id: parseInt(id.toString()) },
      data
    });
  }

  static async delete(id: string | number): Promise<PrismaUser> {
    return await prisma.user.delete({
      where: { id: parseInt(id.toString()) }
    });
  }

  static async findAll(options: UserFindOptions = {}): Promise<UserFindAllResult> {
    const { page = 1, limit = 10, orderBy = 'createdAt' } = options;

    const [users, total] = await Promise.all([
      prisma.user.findMany({
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { [orderBy]: 'desc' },
        select: {
          id: true,
          email: true,
          name: true,
          createdAt: true,
          updatedAt: true
        }
      }),
      prisma.user.count()
    ]);

    return {
      users,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    };
  }
}
