import Fastify, { FastifyInstance, FastifyServerOptions } from "fastify";

export const fastify: FastifyInstance = Fastify({
  logger: {
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
    }
  }
} as FastifyServerOptions);

export interface FastifyConfig {
  port: number;
  host?: string;
}

export const fastifyConfig: FastifyConfig = {
  port: process.env.API_PORT ? parseInt(process.env.API_PORT) : 3001,
};
