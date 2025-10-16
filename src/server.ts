import { fastify, fastifyConfig } from "./config/fastifyConfig.js";
import { registerPlugins } from "./config/plugins.js";
import { registerSwagger } from "./config/swagger.js";
import { autoLoadRoutes } from "./utils/autoLoad.js";
import { registerErrorHandlers } from "./utils/exceptions/errorHandler.js";
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const startServer = async (): Promise<void> => {
  try {
    // Enregistrer les plugins (CORS, etc.)
    await registerPlugins(fastify);

    // Enregistrer Swagger/OpenAPI
    await registerSwagger(fastify);

    // Auto-load des routes
    const routesDir = join(__dirname, 'routes');
    const count = await autoLoadRoutes(routesDir);
    fastify.log.info(`🚀 ${count} routes loaded`);
    fastify.log.info(`📚 Documentation disponible sur http://localhost:${fastifyConfig.port}/documentation`);

    // Enregistrer les handlers d'erreurs et 404
    registerErrorHandlers(fastify);

    const PORT = Number(process.env.PORT) || fastifyConfig.port || 8080;
    const HOST = '0.0.0.0';

    fastify.listen(fastifyConfig, (err: Error | null) => {
      if (err) {
        fastify.log.error(err);
        process.exit(1);
      }
    });
  } catch (error) {
    // @ts-ignore - Fastify log types issue
    fastify.log.error('Failed to start server:', error);
    process.exit(1);
  }
};
