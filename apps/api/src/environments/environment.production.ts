import { Environment } from './environment';

export const environment: Environment = {
  production: true,
  port: 3000,
  apiUrl: 'http://localhost:3000',
  corsOrigins: [
    'http://localhost:4200',  // Angular default
    'http://localhost:3000',  // API itself
    'http://localhost:8080'   // Vue/React default
  ],
  jwtSecret: 'production-secret-key',
  jwtExpiresIn: '1h',
  postgres: {
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'postgres',
    db: 'openassistant'
  }
};
