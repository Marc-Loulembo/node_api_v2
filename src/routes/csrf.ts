import { fastify } from "../config/fastifyConfig.js";
import { getCsrfToken, validateCsrf, protectedOperation } from "../controllers/csrf.js";

fastify.get("/csrf/token", getCsrfToken);

fastify.post("/csrf/validate", validateCsrf);

fastify.post("/csrf/protected", protectedOperation);
