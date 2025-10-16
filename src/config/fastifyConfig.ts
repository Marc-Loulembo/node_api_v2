import Fastify, { FastifyInstance, FastifyLoggerOptions, FastifyServerOptions } from "fastify";
import { FastifyConfig } from '../types/index.js';

const developmentLogger = {
  transport: {
    target: 'pino-pretty',
    options: {
      // Options de formatage
      colorize: true,           // Couleurs dans la console
      translateTime: 'HH:MM:ss', // Format de l'horodatage
      ignore: 'pid,hostname',    // Champs à ignorer
      singleLine: false,         // Une ligne par log
      hideObject: false,         // Masquer les objets
      messageFormat: '{msg}',    // Format du message

      // Options de filtrage
      levelFirst: false,         // Niveau en premier
      messageKey: 'msg',         // Clé du message
      timestampKey: 'time',      // Clé du timestamp

      // Options de couleur
      colorizeObjects: true,     // Couleurs pour les objets
      useLevelLabels: true,      // Utiliser les labels de niveau
      levelLabel: 'levelLabel',  // Clé du label de niveau

      // Options de formatage avancées
      crlf: false,              // Utiliser CRLF au lieu de LF
      errorLikeObjectKeys: [    // Clés d'erreur
        'err',
        'error',
        'errorLikeObjectKeys'
      ],
    }
  },
} as FastifyLoggerOptions;

const productionLogger = {
  logger: false
} as FastifyLoggerOptions;

const logger = (process.env.NODE_ENV === 'development' || !process.env.NODE_ENV) ? developmentLogger : productionLogger;

export const fastify: FastifyInstance = Fastify({
  logger: { ...logger },
  ajv: {
    customOptions: {
      removeAdditional: true,       // Supprime les propriétés supplémentaires
      useDefaults: true,            // Utilise les valeurs par défaut
      coerceTypes: true,            // Convertit automatiquement les types
      allErrors: true,              // Retourne toutes les erreurs
      verbose: true                 // Messages d'erreur détaillés
    }
  },
} as FastifyServerOptions);

// Configuration Swagger/OpenAPI
export const swaggerConfig = {
  openapi: {
    openapi: '3.0.0',
    info: {
      title: 'API Node REST',
      description: 'API REST pour la gestion des posts et catégories',
      version: '1.0.0'
    },
    servers: [
      {
        url: 'http://localhost:3001',
        description: 'Serveur de développement'
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http' as const,
          scheme: 'bearer' as const,
          bearerFormat: 'JWT'
        }
      }
    }
  }
};


export const fastifyConfig: FastifyConfig = {
  // Clever fournit PORT; on accepte aussi API_PORT pour compatibilité locale
  port: process.env.API_PORT ? parseInt(process.env.API_PORT) : (process.env.PORT ? parseInt(process.env.PORT) : 3001),
  // En prod (PaaS), il faut écouter sur 0.0.0.0
  host: '0.0.0.0' as any,
};
