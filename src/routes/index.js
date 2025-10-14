import { fastify } from "../config/fastifyConfig.js";

fastify.get("/", async (request, reply) => {
  return { message: "Hello World" };
});
