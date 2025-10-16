import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { HttpException, InternalServerErrorException } from './HttpException.js';

export function registerErrorHandlers(app: FastifyInstance): void {
  app.setErrorHandler((error: unknown, _request: FastifyRequest, reply: FastifyReply) => {
    if (error instanceof HttpException) {
      reply.status(error.statusCode).send({
        error: error.message,
        code: error.code,
      });
      return;
    }

    // Fastify/validation errors
    const statusCode = (error as any)?.statusCode ?? 500;
    const message = (error as any)?.message ?? 'Erreur interne du serveur';

    if (statusCode >= 500) {
      // Log interne
      app.log.error(error);
    }

    reply.status(statusCode).send({
      error: message,
      code: statusCode >= 500 ? new InternalServerErrorException().code : undefined,
    });
  });

  app.setNotFoundHandler((_request: FastifyRequest, reply: FastifyReply) => {
    reply.status(404).send({ error: 'Route introuvable', code: 'ROUTE_NOT_FOUND' });
  });
}


