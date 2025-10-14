import { FastifyInstance, FastifyServerOptions } from 'fastify';

// Interface pour la configuration Fastify
export interface FastifyConfig {
  port: number;
  host?: string;
}

// Types pour l'instance Fastify
export type FastifyInstanceType = FastifyInstance;
export type FastifyServerOptionsType = FastifyServerOptions;

// Interface pour la configuration de l'application
export interface AppConfig {
  port: number;
  host: string;
  nodeEnv: 'development' | 'production' | 'test';
  databaseUrl: string;
  jwtSecret: string;
  jwtExpiresIn: string;
  jwtRefreshExpiresIn: string;
}
