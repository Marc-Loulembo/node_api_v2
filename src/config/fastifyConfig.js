import Fastify from "fastify";

export const fastify = Fastify({
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
});

export const fastifyConfig = {
  port: 3001,
};