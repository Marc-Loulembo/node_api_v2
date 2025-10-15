import { Category } from '../models/Category.js';
import { Category as PrismaCategory } from '@prisma/client';
import {
  CategoryCreateData,
  CategoryUpdateData,
  CategoryFindOptions,
  CategoryFindAllResult,
  CategoryWithPosts,
  CategoryValidationResult
} from '../types/index.js';

export class CategoryRepository {
  static async findById(id: string | number): Promise<CategoryWithPosts | null> {
    return await Category.findById(id);
  }

  static async findByName(name: string): Promise<PrismaCategory | null> {
    return await Category.findByName(name);
  }

  static async create(categoryData: CategoryCreateData): Promise<CategoryWithPosts> {
    return await Category.create(categoryData);
  }

  static async update(id: string | number, categoryData: CategoryUpdateData): Promise<CategoryWithPosts> {
    return await Category.update(id, categoryData);
  }

  static async delete(id: string | number): Promise<PrismaCategory> {
    return await Category.delete(id);
  }

  static async findAll(options: CategoryFindOptions = {}): Promise<CategoryFindAllResult> {
    return await Category.findAll(options);
  }

  static async getPostsByCategory(categoryId: string | number, options: CategoryFindOptions = {}): Promise<CategoryWithPosts | null> {
    return await Category.getPostsByCategory(categoryId, options);
  }

  static async validateCategoryData(categoryData: Partial<CategoryCreateData>): Promise<CategoryValidationResult> {
    const errors: string[] = [];

    if (!categoryData.name) {
      errors.push('Nom de catégorie requis');
    } else if (categoryData.name.length < 2) {
      errors.push('Nom de catégorie trop court (minimum 2 caractères)');
    } else if (categoryData.name.length > 100) {
      errors.push('Nom de catégorie trop long (maximum 100 caractères)');
    }

    if (categoryData.description && categoryData.description.length > 500) {
      errors.push('Description trop longue (maximum 500 caractères)');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  static async checkCategoryExists(name: string, excludeId?: number): Promise<boolean> {
    const existingCategory = await Category.findByName(name);
    if (!existingCategory) return false;

    if (excludeId && existingCategory.id === excludeId) return false;

    return true;
  }
}
