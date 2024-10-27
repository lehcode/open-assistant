// This file should not be modified directly - use specific environment files instead
export interface Environment {
  production: boolean;
  port: number;
  apiUrl: string;
  corsOrigins: string[];
  jwtSecret: string;
  jwtExpiresIn: string;
  postgres: {
    host: string;
    port: number;
    username: string;
    password: string;
    db: string;
  };
}

export const environment: Environment = {
  production: false,
  port: 3000,
  apiUrl: 'http://localhost:3000',
  corsOrigins: [
    'http://localhost:4200',  // Angular default
    'http://localhost:3000',  // API itself
    'http://localhost:8080'   // Vue/React default
  ],
  jwtSecret: 'your-secret-key',
  jwtExpiresIn: '15m',
  postgres: {
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'postgres',
    db: 'openassistant_dev'
  }
};
