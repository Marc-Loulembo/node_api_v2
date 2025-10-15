import { FastifyRequest, FastifyReply } from 'fastify';

// Interfaces pour les requêtes d'authentification
export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  name: string;
}

export interface RefreshTokenRequest {
  refreshToken: string;
}

// Interfaces pour les réponses d'authentification
export interface AuthResponse {
  message: string;
  token?: string;
  refreshToken?: string;
  user?: {
    id: number;
    email: string;
    name: string;
  };
}

export interface ErrorResponse {
  error: string;
  details?: string[];
}

// Types pour les contrôleurs d'authentification
export type LoginController = (request: FastifyRequest<{ Body: LoginRequest }>, reply: FastifyReply) => Promise<void>;
export type RegisterController = (request: FastifyRequest<{ Body: RegisterRequest }>, reply: FastifyReply) => Promise<void>;
export type LogoutController = (request: FastifyRequest, reply: FastifyReply) => Promise<{ message: string }>;
export type RefreshTokenController = (request: FastifyRequest<{ Body: RefreshTokenRequest }>, reply: FastifyReply) => Promise<void>;
export type MeController = (request: AuthenticatedRequest, reply: FastifyReply) => Promise<void>;

// Interface pour les requêtes authentifiées
export interface AuthenticatedRequest extends FastifyRequest {
  user?: {
    userId: number;
    email: string;
    name: string;
  };
}
