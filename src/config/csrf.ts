import { CsrfConfig } from '../types/index.js';

const developmentCsrfConfig: CsrfConfig = {
  sessionPlugin: '@fastify/cookie',
  cookieOpts: {
    path: '/',
    httpOnly: true,
    secure: false, // En développement, on peut accepter HTTP
    sameSite: 'lax'
  },
  ignoreMethods: ['GET', 'HEAD', 'OPTIONS'],
  userInfo: false, // Ne pas inclure les infos utilisateur dans le token
  sessionKey: 'sessionId'
};

const productionCsrfConfig: CsrfConfig = {
  sessionPlugin: '@fastify/cookie',
  cookieOpts: {
    path: '/',
    httpOnly: true,
    secure: true, // En production, HTTPS obligatoire
    sameSite: 'strict'
  },
  ignoreMethods: ['GET', 'HEAD', 'OPTIONS'],
  userInfo: false,
  sessionKey: 'sessionId'
};

const testCsrfConfig: CsrfConfig = {
  sessionPlugin: '@fastify/cookie',
  cookieOpts: {
    path: '/',
    httpOnly: true,
    secure: false,
    sameSite: 'lax'
  },
  ignoreMethods: ['GET', 'HEAD', 'OPTIONS'],
  userInfo: false,
  sessionKey: 'sessionId'
};

export const getCsrfConfig = (): CsrfConfig => {
  const nodeEnv = process.env.NODE_ENV || 'development';

  switch (nodeEnv) {
    case 'production':
      return productionCsrfConfig;
    case 'test':
      return testCsrfConfig;
    case 'development':
    default:
      return developmentCsrfConfig;
  }
};

export const csrfConfig = getCsrfConfig();
