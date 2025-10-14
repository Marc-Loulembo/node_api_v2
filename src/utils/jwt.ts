import jwt from 'jsonwebtoken';
import { JWT_CONFIG } from '../config/jwt.js';

export interface TokenPayload {
  userId: number;
  email: string;
  name: string;
}

export interface RefreshTokenPayload {
  userId: number;
  type: 'refresh';
}

export const createToken = (payload: TokenPayload): string => {
  // @ts-ignore - JWT types issue
  return jwt.sign(payload, JWT_CONFIG.secret, { expiresIn: JWT_CONFIG.expiresIn });
};

export const createRefreshToken = (payload: RefreshTokenPayload): string => {
  // @ts-ignore - JWT types issue
  return jwt.sign(payload, JWT_CONFIG.secret, { expiresIn: JWT_CONFIG.refreshExpiresIn });
};

export const verifyToken = (token: string): any => {
  return jwt.verify(token, JWT_CONFIG.secret);
};
