import { fastify } from "../../config/fastifyConfig.js";
import { authenticateToken } from "../../middleware/auth.js";
import { FastifyRequest, FastifyReply } from 'fastify';

interface AuthenticatedRequest extends FastifyRequest {
  user?: {
    userId: number;
    email: string;
    name: string;
  };
}

fastify.get("/profile", { preHandler: authenticateToken }, async (request: AuthenticatedRequest, reply: FastifyReply) => {
  return {
    message: "Profil utilisateur",
    user: request.user
  };
});

fastify.get("/private", { preHandler: authenticateToken }, async (request: AuthenticatedRequest, reply: FastifyReply) => {
  return {
    message: "Données privées",
    data: "Ceci est une route protégée",
    userId: request.user?.userId
  };
});
