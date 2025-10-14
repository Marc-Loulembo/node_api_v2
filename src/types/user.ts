import { User as PrismaUser } from '@prisma/client';

// Interfaces pour les données utilisateur
export interface UserCreateData {
  email: string;
  name: string;
  password: string;
}

export interface UserUpdateData {
  email?: string;
  name?: string;
  password?: string;
}

export interface UserFindOptions {
  page?: number;
  limit?: number;
  orderBy?: string;
}

export interface UserPagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface UserFindAllResult {
  users: Omit<PrismaUser, 'password'>[];
  pagination: UserPagination;
}

export interface UserValidationResult {
  isValid: boolean;
  errors: string[];
}

// Types pour les réponses utilisateur
export interface UserResponse {
  id: number;
  email: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserProfileResponse {
  id: number;
  email: string;
  name: string;
  createdAt: Date;
}
