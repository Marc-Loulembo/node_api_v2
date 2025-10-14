import { fastify } from "../../config/fastifyConfig.js";
import { login, register, logout, refreshToken } from "../../controllers/auth.js";

fastify.post("/auth/login", login);

fastify.post("/auth/register", register);

fastify.post("/auth/logout", logout);

fastify.post("/auth/refresh", refreshToken);
