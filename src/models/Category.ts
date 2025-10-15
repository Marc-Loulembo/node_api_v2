import { prisma } from '../lib/prisma.js';
import { Category as PrismaCategory } from '@prisma/client';
import {
  CategoryCreateData,
  CategoryUpdateData,
  CategoryFindOptions,
  CategoryPagination,
  CategoryWithPosts,
  CategoryFindAllResult
} from '../types/index.js';

export class Category {
  static async findById(id: string | number): Promise<CategoryWithPosts | null> {
    return await prisma.category.findUnique({
      where: { id: parseInt(id.toString()) },
      include: {
        posts: {
          select: {
            id: true,
            title: true,
            createdAt: true
          }
        }
      }
    });
  }

  static async findByName(name: string): Promise<PrismaCategory | null> {
    return await prisma.category.findUnique({
      where: { name }
    });
  }

  static async create(data: CategoryCreateData): Promise<CategoryWithPosts> {
    return await prisma.category.create({
      data,
      include: {
        posts: {
          select: {
            id: true,
            title: true,
            createdAt: true
          }
        }
      }
    });
  }

  static async update(id: string | number, data: CategoryUpdateData): Promise<CategoryWithPosts> {
    return await prisma.category.update({
      where: { id: parseInt(id.toString()) },
      data,
      include: {
        posts: {
          select: {
            id: true,
            title: true,
            createdAt: true
          }
        }
      }
    });
  }

  static async delete(id: string | number): Promise<PrismaCategory> {
    return await prisma.category.delete({
      where: { id: parseInt(id.toString()) }
    });
  }

  static async findAll(options: CategoryFindOptions = {}): Promise<CategoryFindAllResult> {
    const { page = 1, limit = 10, orderBy = 'createdAt' } = options;

    const [categories, total] = await Promise.all([
      prisma.category.findMany({
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { [orderBy]: 'desc' },
        include: {
          posts: {
            select: {
              id: true,
              title: true,
              createdAt: true
            }
          }
        }
      }),
      prisma.category.count()
    ]);

    return {
      categories,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    };
  }

  static async getPostsByCategory(categoryId: string | number, options: CategoryFindOptions = {}): Promise<CategoryWithPosts | null> {
    return await prisma.category.findUnique({
      where: { id: parseInt(categoryId.toString()) },
      include: {
        posts: {
          select: {
            id: true,
            title: true,
            content: true,
            createdAt: true,
            authors: {
              select: {
                id: true,
                name: true,
                email: true
              }
            }
          }
        }
      }
    });
  }
}
