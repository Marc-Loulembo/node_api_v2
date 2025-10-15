import { fastify } from "../config/fastifyConfig.js";
import { FastifyRequest, FastifyReply } from 'fastify';

// Import des routes
import './category.js';

// Route principale
fastify.get("/", async (request: FastifyRequest, reply: FastifyReply) => {
  return { message: "Hello World" };
});
