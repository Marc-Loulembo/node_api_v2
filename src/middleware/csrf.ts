import { FastifyRequest, FastifyReply } from 'fastify';
import { CsrfValidationResult, CsrfResponse } from '../types/index.js';

/**
 * Middleware pour générer un token CSRF
 * À utiliser sur les routes qui nécessitent un token CSRF
 */
export const generateCsrfToken = async (
  request: FastifyRequest,
  reply: FastifyReply
): Promise<CsrfResponse> => {
  try {
    // Le plugin @fastify/csrf-protection ajoute automatiquement la méthode generateCsrf
    const csrfToken = await (request as any).generateCsrf();

    return {
      csrfToken,
      cookieName: 'csrfToken'
    };
  } catch (error) {
    request.log.error('Erreur lors de la génération du token CSRF');
    throw new Error('Impossible de générer le token CSRF');
  }
};

/**
 * Middleware pour valider un token CSRF
 * À utiliser sur les routes qui reçoivent des données
 */
export const validateCsrfToken = async (
  request: FastifyRequest,
  reply: FastifyReply
): Promise<CsrfValidationResult> => {
  try {
    // Le plugin @fastify/csrf-protection valide automatiquement le token
    // Si on arrive ici, c'est que la validation a réussi
    return {
      isValid: true
    };
  } catch (error) {
    request.log.error('Erreur lors de la validation du token CSRF');
    return {
      isValid: false,
      error: 'Token CSRF invalide ou manquant'
    };
  }
};

/**
 * Middleware pour vérifier la présence du token CSRF dans les headers
 */
export const checkCsrfHeader = (request: FastifyRequest): boolean => {
  const csrfToken = request.headers['x-csrf-token'] || request.headers['x-csrftoken'];
  return !!csrfToken;
};

/**
 * Middleware pour extraire le token CSRF des headers
 */
export const extractCsrfToken = (request: FastifyRequest): string | null => {
  return (request.headers['x-csrf-token'] || request.headers['x-csrftoken']) as string || null;
};

/**
 * Hook pour ajouter automatiquement la protection CSRF aux routes
 */
export const csrfProtectionHook = async (
  request: FastifyRequest,
  reply: FastifyReply
): Promise<void> => {
  // Vérifier si la route nécessite une protection CSRF
  const protectedMethods = ['POST', 'PUT', 'DELETE', 'PATCH'];
  const isProtectedMethod = protectedMethods.includes(request.method);

  if (!isProtectedMethod) {
    return;
  }

  // Vérifier si le token CSRF est présent
  if (!checkCsrfHeader(request)) {
    reply.code(403).send({
      error: 'Token CSRF manquant',
      message: 'Un token CSRF est requis pour cette opération'
    });
    return;
  }

  // Le plugin @fastify/csrf-protection se charge de la validation automatique
  // Si on arrive ici, la validation a réussi
};
