import { fastify, fastifyConfig } from "./config/fastifyConfig.js";
import { autoLoadRoutes } from "./utils/autoLoad.js";
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const startServer = async () => {
  try {
    // Auto-load des routes
    const routesDir = join(__dirname, 'routes');
    const count = await autoLoadRoutes(routesDir);
    fastify.log.info(`🚀 ${count} routes loaded`);

    fastify.listen(fastifyConfig, (err) => {
      if (err) {
        fastify.log.error(err);
        process.exit(1);
      }
    });
  } catch (error) {
    fastify.log.error('Failed to start server:', error);
    process.exit(1);
  }
};
