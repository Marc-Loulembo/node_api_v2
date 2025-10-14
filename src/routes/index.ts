import { fastify } from "../config/fastifyConfig.js";
import { FastifyRequest, FastifyReply } from 'fastify';
import { csrfRoutes } from './csrf.js';

// Route principale
fastify.get("/", async (request: FastifyRequest, reply: FastifyReply) => {
  return { message: "Hello World" };
});

// Enregistrement des routes CSRF
fastify.register(csrfRoutes, { prefix: '/api/csrf' });
