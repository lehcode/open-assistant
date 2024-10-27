import { Environment } from './environment';

export const environment: Environment = {
  production: false,
  port: 3000,
  apiUrl: 'http://localhost:3000',
  corsOrigins: [
    'http://localhost:4200',  // Angular default
    'http://localhost:3000',  // API itself
    'http://localhost:8080'   // Vue/React default
  ],
  jwtSecret: 'development-secret-key',
  jwtExpiresIn: '1d', // Longer expiration for development
  postgres: {
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'postgres',
    db: 'openassistant_dev'
  }
};
