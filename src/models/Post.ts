import { prisma } from '../lib/prisma.js';
import { Post as PrismaPost, User as PrismaUser } from '@prisma/client';
import {
  PostCreateData,
  PostUpdateData,
  PostFindOptions,
  PostPagination,
  PostWithAuthor,
  PostFindAllResult
} from '../types/index.js';

export class Post {
  static async findById(id: string | number): Promise<PostWithAuthor | null> {
    return await prisma.post.findUnique({
      where: { id: parseInt(id.toString()) },
      include: {
        authors: {
          select: {
            id: true,
            name: true,
            email: true
          }
        },
        category: {
          select: {
            id: true,
            name: true,
            description: true
          }
        }
      }
    });
  }

  static async create(data: PostCreateData): Promise<PostWithAuthor> {
    return await prisma.post.create({
      data: {
        title: data.title,
        content: data.content,
        authorId: parseInt(data.authorId.toString()),
        categoryId: parseInt(data.categoryId.toString())
      },
      include: {
        authors: {
          select: {
            id: true,
            name: true,
            email: true
          }
        },
        category: {
          select: {
            id: true,
            name: true,
            description: true
          }
        }
      }
    });
  }

  static async update(id: string | number, data: PostUpdateData): Promise<PostWithAuthor> {
    return await prisma.post.update({
      where: { id: parseInt(id.toString()) },
      data: {
        title: data.title,
        content: data.content,
        ...(data.categoryId && { categoryId: parseInt(data.categoryId.toString()) })
      },
      include: {
        authors: {
          select: {
            id: true,
            name: true,
            email: true
          }
        },
        category: {
          select: {
            id: true,
            name: true,
            description: true
          }
        }
      }
    });
  }

  static async delete(id: string | number): Promise<PrismaPost> {
    return await prisma.post.delete({
      where: { id: parseInt(id.toString()) }
    });
  }

  static async findAll(options: PostFindOptions = {}): Promise<PostFindAllResult> {
    const { page = 1, limit = 10, orderBy = 'createdAt' } = options;

    const [posts, total] = await Promise.all([
      prisma.post.findMany({
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { [orderBy]: 'desc' },
        include: {
          authors: {
            select: {
              id: true,
              name: true,
              email: true
            }
          },
          category: {
            select: {
              id: true,
              name: true,
              description: true
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

  static async findByAuthor(authorId: string | number, options: PostFindOptions = {}): Promise<PostFindAllResult> {
    const { page = 1, limit = 10 } = options;

    const [posts, total] = await Promise.all([
      prisma.post.findMany({
        where: { authorId: parseInt(authorId.toString()) },
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          authors: {
            select: {
              id: true,
              name: true,
              email: true
            }
          },
          category: {
            select: {
              id: true,
              name: true,
              description: true
            }
          }
        }
      }),
      prisma.post.count({
        where: { authorId: parseInt(authorId.toString()) }
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
