import { prisma } from '../lib/prisma.js';

type FindUniqueResult = Awaited<ReturnType<typeof prisma.user.findUnique>>;
type CreateResult = Awaited<ReturnType<typeof prisma.user.create>>;
type UpdateResult = Awaited<ReturnType<typeof prisma.user.update>>;
type DeleteResult = Awaited<ReturnType<typeof prisma.user.delete>>;
import type {
  UserCreateData,
  UserUpdateData,
  UserFindOptions,
  UserPagination,
  UserFindAllResult
} from '../types/index.js';

export class User {
  static async findById(id: string | number): Promise<FindUniqueResult> {
    return await prisma.user.findUnique({
      where: { id: parseInt(id.toString()) }
    });
  }

  static async findByEmail(email: string): Promise<FindUniqueResult> {
    return await prisma.user.findUnique({
      where: { email }
    });
  }

  static async create(data: UserCreateData): Promise<CreateResult> {
    return await prisma.user.create({
      data
    });
  }

  static async update(id: string | number, data: UserUpdateData): Promise<UpdateResult> {
    return await prisma.user.update({
      where: { id: parseInt(id.toString()) },
      data
    });
  }

  static async delete(id: string | number): Promise<DeleteResult> {
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
