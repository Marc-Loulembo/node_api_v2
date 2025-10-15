import { Post as PrismaPost } from '@prisma/client';

// Interfaces pour les données de post
export interface PostCreateData {
  title: string;
  content: string;
  authorId: string | number;
  categoryId: string | number;
}

export interface PostUpdateData {
  title?: string;
  content?: string;
  categoryId?: string | number;
}

export interface PostFindOptions {
  page?: number;
  limit?: number;
  orderBy?: string;
}

export interface PostPagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface PostWithAuthor extends Omit<PrismaPost, 'authorId' | 'categoryId'> {
  authors: {
    id: number;
    name: string;
    email: string;
  };
  category: {
    id: number;
    name: string;
    description: string | null;
  };
}

export interface PostFindAllResult {
  posts: PostWithAuthor[];
  pagination: PostPagination;
}

export interface PostValidationResult {
  isValid: boolean;
  errors: string[];
}

// Interfaces pour les requêtes de post
export interface PostQueryParams {
  page?: string;
  limit?: string;
}

export interface PostRequestBody {
  id?: string | number;
  title?: string;
  content?: string;
  authorId?: string | number;
  categoryId?: string | number;
}

export interface PostResponse {
  message?: string;
  error?: string;
  details?: string[];
}

// Types pour les contrôleurs de post
export type PostController = (request: any, reply: any) => Promise<any>;
