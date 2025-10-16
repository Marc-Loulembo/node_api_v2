import { FastifyInstance } from 'fastify';
import { swaggerConfig, fastifyConfig } from './fastifyConfig.js';
import swagger from '@fastify/swagger';
import swaggerUi from '@fastify/swagger-ui';

export const registerSwagger = async (fastify: FastifyInstance) => {
  try {
    // Construire dynamiquement l'URL du serveur en fonction du port configuré
    const dynamicSwaggerConfig = {
      ...swaggerConfig,
      openapi: {
        ...swaggerConfig.openapi,
        servers: [
          {
            url: `http://localhost:${fastifyConfig.port}`,
            description: 'Serveur de développement'
          }
        ]
      }
    };

    // Enregistrer le plugin Swagger
    await fastify.register(swagger, dynamicSwaggerConfig as any);

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
