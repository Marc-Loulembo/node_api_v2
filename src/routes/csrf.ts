import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import { generateCsrfToken, validateCsrfToken } from '../middleware/csrf.js';
import { CsrfResponse } from '../types/index.js';

/**
 * Route pour obtenir un token CSRF
 * GET /api/csrf/token
 */
const getCsrfToken = async (
  request: FastifyRequest,
  reply: FastifyReply
): Promise<void> => {
  try {
    const csrfData = await generateCsrfToken(request, reply);

    reply.code(200).send({
      success: true,
      data: csrfData,
      message: 'Token CSRF généré avec succès'
    });
  } catch (error) {
    request.log.error('Erreur lors de la génération du token CSRF');
    reply.code(500).send({
      success: false,
      error: 'Erreur lors de la génération du token CSRF'
    });
  }
};

/**
 * Route de test pour valider un token CSRF
 * POST /api/csrf/validate
 */
const validateCsrf = async (
  request: FastifyRequest,
  reply: FastifyReply
): Promise<void> => {
  try {
    const validation = await validateCsrfToken(request, reply);

    if (validation.isValid) {
      reply.code(200).send({
        success: true,
        message: 'Token CSRF valide'
      });
    } else {
      reply.code(403).send({
        success: false,
        error: validation.error || 'Token CSRF invalide'
      });
    }
  } catch (error) {
    request.log.error('Erreur lors de la validation du token CSRF');
    reply.code(500).send({
      success: false,
      error: 'Erreur lors de la validation du token CSRF'
    });
  }
};

/**
 * Route de test pour une opération protégée par CSRF
 * POST /api/csrf/protected
 */
const protectedOperation = async (
  request: FastifyRequest,
  reply: FastifyReply
): Promise<void> => {
  try {
    // Le middleware CSRF se charge automatiquement de la validation
    // Si on arrive ici, c'est que la validation a réussi

    reply.code(200).send({
      success: true,
      message: 'Opération protégée exécutée avec succès',
      data: {
        timestamp: new Date().toISOString(),
        method: request.method,
        url: request.url
      }
    });
  } catch (error) {
    request.log.error('Erreur lors de l\'opération protégée');
    reply.code(500).send({
      success: false,
      error: 'Erreur lors de l\'opération protégée'
    });
  }
};

/**
 * Enregistrement des routes CSRF
 */
export const csrfRoutes = async (fastify: FastifyInstance): Promise<void> => {
  // Route pour obtenir un token CSRF
  fastify.get('/token', getCsrfToken);

  // Route pour valider un token CSRF
  fastify.post('/validate', validateCsrf);

  // Route d'exemple pour une opération protégée
  fastify.post('/protected', protectedOperation);
};
