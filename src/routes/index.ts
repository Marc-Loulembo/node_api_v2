import { fastify } from "../config/fastifyConfig.js";
import { FastifyRequest, FastifyReply } from 'fastify';

// Route principale
fastify.get("/", async (request: FastifyRequest, reply: FastifyReply) => {
  return { message: "Hello World" };
});
