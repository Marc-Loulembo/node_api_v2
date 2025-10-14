// Interfaces pour les payloads JWT
export interface TokenPayload {
  userId: number;
  email: string;
  name: string;
}

export interface RefreshTokenPayload {
  userId: number;
  type: 'refresh';
}

// Interface pour la configuration JWT
export interface JwtConfig {
  secret: string;
  expiresIn: string;
  refreshExpiresIn: string;
}

// Types pour les fonctions JWT
export type CreateTokenFunction = (payload: TokenPayload) => string;
export type CreateRefreshTokenFunction = (payload: RefreshTokenPayload) => string;
export type VerifyTokenFunction = (token: string) => any;
