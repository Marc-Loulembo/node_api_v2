import { FastifyInstance } from 'fastify';
import { swaggerConfig } from './fastifyConfig.js';
import swagger from '@fastify/swagger';
import swaggerUi from '@fastify/swagger-ui';

export const registerSwagger = async (fastify: FastifyInstance) => {
  try {
    // Enregistrer le plugin Swagger
    await fastify.register(swagger, swaggerConfig);

    // Enregistrer le plugin Swagger UI
    await fastify.register(swaggerUi, {
      routePrefix: '/documentation',
      uiConfig: {
        docExpansion: 'full',
        deepLinking: false
      },
      staticCSP: true
    });

    fastify.log.info('📚 Swagger/OpenAPI configuré avec succès');
  } catch (error) {
    fastify.log.error('Erreur lors de la configuration Swagger:');
    fastify.log.error(error);
    throw error;
  }
};
