import { env, type EnvConfig } from './env.js';

export const config = {
  env: env.NODE_ENV,
  isProduction: env.NODE_ENV === 'production',
  isDevelopment: env.NODE_ENV === 'development',
  isTest: env.NODE_ENV === 'test',
  server: {
    port: env.PORT,
    host: env.HOST,
    apiPrefix: env.API_PREFIX,
    corsOrigin: env.CORS_ORIGIN,
  },
  database: {
    url: env.DATABASE_URL,
  },
  logging: {
    level: env.LOG_LEVEL,
  },
} as const;

export { env, type EnvConfig };
export default config;
