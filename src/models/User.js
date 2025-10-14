import { prisma } from '../lib/prisma.js';

export class User {
  static async findById(id) {
    return await prisma.user.findUnique({
      where: { id: parseInt(id) }
    });
  }

  static async findByEmail(email) {
    return await prisma.user.findUnique({
      where: { email }
    });
  }

  static async create(data) {
    return await prisma.user.create({
      data
    });
  }

  static async update(id, data) {
    return await prisma.user.update({
      where: { id: parseInt(id) },
      data
    });
  }

  static async delete(id) {
    return await prisma.user.delete({
      where: { id: parseInt(id) }
    });
  }

  static async findAll(options = {}) {
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
