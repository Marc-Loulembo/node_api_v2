import bcrypt from 'bcryptjs';
import { prisma } from '../lib/prisma.js';
import { createToken, createRefreshToken, verifyToken } from '../utils/jwt.js';
import {
  LoginRequest,
  RegisterRequest,
  RefreshTokenRequest,
  AuthResponse,
  ErrorResponse,
  LoginController,
  RegisterController,
  LogoutController,
  RefreshTokenController
} from '../types/index.js';

export const login: LoginController = async (request, reply) => {
  try {
    const { email, password } = request.body;

    if (!email || !password) {
      reply.status(400).send({
        error: 'Email et mot de passe requis'
      });
      return;
    }

    // Recherche de l'utilisateur avec Prisma
    const user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user) {
      reply.status(401).send({
        error: 'Identifiants invalides'
      });
      return;
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      reply.status(401).send({
        error: 'Identifiants invalides'
      });
      return;
    }

    const token = createToken({
      userId: user.id,
      email: user.email,
      name: user.name
    });

    const refreshToken = createRefreshToken({
      userId: user.id,
      type: 'refresh'
    });

    reply.send({
      message: 'Connexion réussie',
      token,
      refreshToken,
      user: {
        id: user.id,
        email: user.email,
        name: user.name
      }
    });
  } catch (error) {
    reply.status(500).send({
      error: 'Erreur interne du serveur'
    });
  }
};

export const register: RegisterController = async (request, reply) => {
  try {
    const { email, password, name } = request.body;

    if (!email || !password || !name) {
      reply.status(400).send({
        error: 'Email, mot de passe et nom requis'
      });
      return;
    }

    // Vérifier si l'utilisateur existe déjà
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      reply.status(409).send({
        error: 'Un utilisateur avec cet email existe déjà'
      });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name
      }
    });

    const token = createToken({
      userId: newUser.id,
      email: newUser.email,
      name: newUser.name
    });

    reply.send({
      message: 'Inscription réussie',
      token,
      user: {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name
      }
    });
  } catch (error) {
    reply.status(500).send({
      error: 'Erreur interne du serveur'
    });
  }
};

export const logout: LogoutController = async (request, reply) => {
  return {
    message: 'Déconnexion réussie'
  };
};

export const refreshToken: RefreshTokenController = async (request, reply) => {
  try {
    const { refreshToken } = request.body;

    if (!refreshToken) {
      reply.status(400).send({
        error: 'Refresh token requis'
      });
      return;
    }

    const decoded = verifyToken(refreshToken);

    if (decoded.type !== 'refresh') {
      reply.status(401).send({
        error: 'Token invalide'
      });
      return;
    }

    const user = await prisma.user.findUnique({
      where: { id: decoded.userId }
    });

    if (!user) {
      reply.status(401).send({
        error: 'Utilisateur non trouvé'
      });
      return;
    }

    const newToken = createToken({
      userId: user.id,
      email: user.email,
      name: user.name
    });

    reply.send({
      message: 'Token rafraîchi',
      token: newToken
    });
  } catch (error) {
    reply.status(401).send({
      error: 'Refresh token invalide'
    });
  }
};
