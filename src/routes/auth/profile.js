import { fastify } from "../../config/fastifyConfig.js";
import { authenticateToken } from "../../middleware/auth.js";

fastify.get("/profile", { preHandler: authenticateToken }, async (request, reply) => {
  return {
    message: "Profil utilisateur",
    user: request.user
  };
});

fastify.get("/private", { preHandler: authenticateToken }, async (request, reply) => {
  return {
    message: "Données privées",
    data: "Ceci est une route protégée",
    userId: request.user.userId
  };
});
