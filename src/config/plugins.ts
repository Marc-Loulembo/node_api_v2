import { FastifyInstance } from 'fastify';
import { corsConfig } from './cors.js';

// Fonction pour enregistrer tous les plugins Fastify
export const registerPlugins = async (fastify: FastifyInstance): Promise<void> => {
  // Enregistrer le plugin CORS
  await fastify.register(import('@fastify/cors'), corsConfig);

  // Log de confirmation
  fastify.log.info('🔧 Plugins enregistrés : CORS');
};
