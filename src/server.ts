import { fastify, fastifyConfig } from "./config/fastifyConfig.js";
import { registerPlugins } from "./config/plugins.js";
import { autoLoadRoutes } from "./utils/autoLoad.js";
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const startServer = async (): Promise<void> => {
  try {
    // Enregistrer les plugins (CORS, etc.)
    await registerPlugins(fastify);

    // Auto-load des routes
    const routesDir = join(__dirname, 'routes');
    const count = await autoLoadRoutes(routesDir);
    fastify.log.info(`🚀 ${count} routes loaded`);

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
