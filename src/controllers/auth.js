import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { JWT_CONFIG } from '../config/jwt.js';
import { prisma } from '../lib/prisma.js';


export const login = async (request, reply) => {
  try {
    const { email, password } = request.body;

    if (!email || !password) {
      return reply.status(400).send({
        error: 'Email et mot de passe requis'
      });
    }

    // Recherche de l'utilisateur avec Prisma
    const user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user) {
      return reply.status(401).send({
        error: 'Identifiants invalides'
      });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return reply.status(401).send({
        error: 'Identifiants invalides'
      });
    }

    const token = jwt.sign(
      {
        userId: user.id,
        email: user.email,
        name: user.name
      },
      JWT_CONFIG.secret,
      { expiresIn: JWT_CONFIG.expiresIn }
    );

    const refreshToken = jwt.sign(
      { userId: user.id, type: 'refresh' },
      JWT_CONFIG.secret,
      { expiresIn: JWT_CONFIG.refreshExpiresIn }
    );

    return {
      message: 'Connexion réussie',
      token,
      refreshToken,
      user: {
        id: user.id,
        email: user.email,
        name: user.name
      }
    };
  } catch (error) {
    reply.status(500).send({
      error: 'Erreur interne du serveur'
    });
  }
};

export const register = async (request, reply) => {
  try {
    const { email, password, name } = request.body;

    if (!email || !password || !name) {
      return reply.status(400).send({
        error: 'Email, mot de passe et nom requis'
      });
    }

    const existingUser = users.find(u => u.email === email);
    if (existingUser) {
      return reply.status(409).send({
        error: 'Un utilisateur avec cet email existe déjà'
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
      id: users.length + 1,
      email,
      password: hashedPassword,
      name
    };

    users.push(newUser);

    const token = jwt.sign(
      {
        userId: newUser.id,
        email: newUser.email,
        name: newUser.name
      },
      JWT_CONFIG.secret,
      { expiresIn: JWT_CONFIG.expiresIn }
    );

    return {
      message: 'Inscription réussie',
      token,
      user: {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name
      }
    };
  } catch (error) {
    reply.status(500).send({
      error: 'Erreur interne du serveur'
    });
  }
};

export const logout = async (request, reply) => {
  return {
    message: 'Déconnexion réussie'
  };
};

export const refreshToken = async (request, reply) => {
  try {
    const { refreshToken } = request.body;

    if (!refreshToken) {
      return reply.status(400).send({
        error: 'Refresh token requis'
      });
    }

    const decoded = jwt.verify(refreshToken, JWT_CONFIG.secret);

    if (decoded.type !== 'refresh') {
      return reply.status(401).send({
        error: 'Token invalide'
      });
    }

    const user = users.find(u => u.id === decoded.userId);
    if (!user) {
      return reply.status(401).send({
        error: 'Utilisateur non trouvé'
      });
    }

    const newToken = jwt.sign(
      {
        userId: user.id,
        email: user.email,
        name: user.name
      },
      JWT_CONFIG.secret,
      { expiresIn: JWT_CONFIG.expiresIn }
    );

    return {
      message: 'Token rafraîchi',
      token: newToken
    };
  } catch (error) {
    reply.status(401).send({
      error: 'Refresh token invalide'
    });
  }
};
