import { fastify } from "../../config/fastifyConfig.js";
import { login, register, logout, refreshToken, me } from "../../controllers/auth.js";
import { authenticateToken } from "../../middleware/auth.js";

fastify.post("/auth/login", login);

fastify.get("/auth/me", { preHandler: authenticateToken }, me);

fastify.post("/auth/register", register);

fastify.post("/auth/logout", logout);

fastify.post("/auth/refresh", refreshToken);
