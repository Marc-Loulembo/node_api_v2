import { prisma } from '../lib/prisma.js';

export class Post {
  static async findById(id) {
    return await prisma.post.findUnique({
      where: { id: parseInt(id) },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      }
    });
  }

  static async create(data) {
    return await prisma.post.create({
      data: {
        title: data.title,
        content: data.content,
        authorId: parseInt(data.authorId)
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      }
    });
  }

  static async update(id, data) {
    return await prisma.post.update({
      where: { id: parseInt(id) },
      data: {
        title: data.title,
        content: data.content
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      }
    });
  }

  static async delete(id) {
    return await prisma.post.delete({
      where: { id: parseInt(id) }
    });
  }

  static async findAll(options = {}) {
    const { page = 1, limit = 10, orderBy = 'createdAt' } = options;

    const [posts, total] = await Promise.all([
      prisma.post.findMany({
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { [orderBy]: 'desc' },
        include: {
          author: {
            select: {
              id: true,
              name: true,
              email: true
            }
          }
        }
      }),
      prisma.post.count()
    ]);

    return {
      posts,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    };
  }

  static async findByAuthor(authorId, options = {}) {
    const { page = 1, limit = 10 } = options;

    const [posts, total] = await Promise.all([
      prisma.post.findMany({
        where: { authorId: parseInt(authorId) },
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          author: {
            select: {
              id: true,
              name: true,
              email: true
            }
          }
        }
      }),
      prisma.post.count({
        where: { authorId: parseInt(authorId) }
      })
    ]);

    return {
      posts,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    };
  }
}
