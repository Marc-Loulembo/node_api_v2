import { fastify } from "../config/fastifyConfig.js";
import { getCsrfToken, validateCsrf, protectedOperation } from "../controllers/csrf.js";
import { getCsrfTokenSchema, validateCsrfSchema, protectedOperationSchema } from "../dtos/CsrfDtos.js";

fastify.get("/csrf/token", { schema: getCsrfTokenSchema }, getCsrfToken);

fastify.post("/csrf/validate", { schema: validateCsrfSchema }, validateCsrf);

fastify.post("/csrf/protected", { schema: protectedOperationSchema }, protectedOperation);
