import { fastify } from "../../config/fastifyConfig.js";
import { login, register, logout, refreshToken, me } from "../../controllers/auth.js";
import { authenticateToken } from "../../middleware/auth.js";
import { loginSchema, registerSchema, meSchema, refreshTokenSchema, logoutSchema } from "../../dtos/AuthDtos.js";

fastify.post("/auth/login", { schema: loginSchema }, login);

fastify.get("/auth/me", { preHandler: authenticateToken, schema: meSchema }, me);

fastify.post("/auth/register", { schema: registerSchema }, register);

fastify.post("/auth/logout", { schema: logoutSchema }, logout);

fastify.post("/auth/refresh", { schema: refreshTokenSchema }, refreshToken);
