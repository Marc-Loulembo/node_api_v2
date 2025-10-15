import { FastifyInstance } from 'fastify';
import { corsConfig } from './cors.js';
import { csrfConfig } from './csrf.js';

// Fonction pour enregistrer tous les plugins Fastify
export const registerPlugins = async (fastify: FastifyInstance): Promise<void> => {
  // Enregistrer le plugin CORS
  await fastify.register(import('@fastify/cors'), corsConfig);

  // Enregistrer le plugin Cookie (nécessaire pour CSRF)
  await fastify.register(import('@fastify/cookie'), {
    secret: process.env.COOKIE_SECRET || 'your-secret-key-change-in-production',
    parseOptions: {}
  });

  // Enregistrer le plugin CSRF Protection (temporairement désactivé)
  // await fastify.register(import('@fastify/csrf-protection'));

  // Log de confirmation
  fastify.log.info('🔧 Plugins enregistrés : CORS, Cookie');
};
