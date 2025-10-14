import { FastifyReply } from 'fastify';
import { verifyToken } from '../utils/jwt.js';
import { AuthenticatedRequest } from '../types/index.js';

export const authenticateToken = async (request: AuthenticatedRequest, reply: FastifyReply): Promise<void> => {
  try {
    const authHeader = request.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

    if (!token) {
      reply.status(401).send({
        error: 'Token d\'accès requis'
      });
      return;
    }

    const decoded = verifyToken(token);
    request.user = decoded;

  } catch (error: any) {
    if (error.name === 'TokenExpiredError') {
      reply.status(401).send({
        error: 'Token expiré'
      });
    } else if (error.name === 'JsonWebTokenError') {
      reply.status(401).send({
        error: 'Token invalide'
      });
    } else {
      reply.status(401).send({
        error: 'Token invalide'
      });
    }
  }
};

export const optionalAuth = async (request: AuthenticatedRequest, reply: FastifyReply): Promise<void> => {
  try {
    const authHeader = request.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    if (token) {
      const decoded = verifyToken(token);
      request.user = decoded;
    }
  } catch (error) {
    // Ignore errors for optional auth
  }
};
