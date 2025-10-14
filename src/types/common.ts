import { FastifyRequest, FastifyReply } from 'fastify';

// Types communs pour les réponses API
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  details?: string[];
}

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: PaginationMeta;
}

// Types pour les erreurs
export interface ApiError {
  code: string;
  message: string;
  details?: any;
}

// Types pour les requêtes avec pagination
export interface PaginationQuery {
  page?: string;
  limit?: string;
  orderBy?: string;
  order?: 'asc' | 'desc';
}

// Types pour les réponses de validation
export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

// Types génériques pour les contrôleurs
export type ControllerFunction<T = any> = (
  request: FastifyRequest<{ Body?: T; Querystring?: any; Params?: any }>,
  reply: FastifyReply
) => Promise<void>;

// Types pour les middlewares
export type MiddlewareFunction = (
  request: FastifyRequest,
  reply: FastifyReply
) => Promise<void>;

// Types pour les utilitaires
export type UtilityFunction<T = any, R = any> = (param: T) => R;
