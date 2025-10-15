import { FastifyRequest, FastifyReply } from 'fastify';
import { generateCsrfToken, validateCsrfToken } from '../middleware/csrf.js';

export const getCsrfToken = async (
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

export const validateCsrf = async (
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

export const protectedOperation = async (
  request: FastifyRequest,
  reply: FastifyReply
): Promise<void> => {
  try {
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
