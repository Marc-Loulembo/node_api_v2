import jwt from 'jsonwebtoken';
import { JWT_CONFIG } from '../config/jwt.js';

export const authenticateToken = async (request, reply) => {
  try {
    const authHeader = request.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

    if (!token) {
      return reply.status(401).send({
        error: 'Token d\'accès requis'
      });
    }

    const decoded = jwt.verify(token, JWT_CONFIG.secret);
    request.user = decoded;

  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return reply.status(401).send({
        error: 'Token expiré'
      });
    } else if (error.name === 'JsonWebTokenError') {
      return reply.status(401).send({
        error: 'Token invalide'
      });
    } else {
      return reply.status(401).send({
        error: 'Token invalide'
      });
    }
  }
};

export const optionalAuth = async (request, reply) => {
  try {
    const authHeader = request.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    if (token) {
      const decoded = jwt.verify(token, JWT_CONFIG.secret);
      request.user = decoded;
    }
  } catch (error) {
  }
};
