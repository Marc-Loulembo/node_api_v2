import { Category as PrismaCategory } from '../types/index.js';

// Interfaces pour les données de catégorie
export interface CategoryCreateData {
  name: string;
  description?: string;
}

export interface CategoryUpdateData {
  name?: string;
  description?: string;
}

export interface CategoryFindOptions {
  page?: number;
  limit?: number;
  orderBy?: string;
}

export interface CategoryPagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface CategoryWithPosts extends Omit<PrismaCategory, 'id'> {
  id: number;
  posts: {
    id: number;
    title: string;
    createdAt: Date;
  }[];
}

export interface CategoryFindAllResult {
  categories: CategoryWithPosts[];
  pagination: CategoryPagination;
}

export interface CategoryValidationResult {
  isValid: boolean;
  errors: string[];
}

// Interfaces pour les requêtes de catégorie
export interface CategoryQueryParams {
  page?: string;
  limit?: string;
}

export interface CategoryRequestBody {
  id?: string | number;
  name?: string;
  description?: string;
}

export interface CategoryResponse {
  message?: string;
  error?: string;
  details?: string[];
}

// Types pour les contrôleurs de catégorie
export type CategoryController = (request: any, reply: any) => Promise<any>;
