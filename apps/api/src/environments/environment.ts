// This file should not be modified directly - use specific environment files instead
export interface IDevEnvironment {
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
  bcrypt: {
    saltRounds: number;
  }
}

const environment: IDevEnvironment = {
  production: false,
  port: 3000,
  apiUrl: 'http://localhost:3000',
  corsOrigins: [
    'http://localhost:4200',  // Angular default
    'http://localhost:3000',  // API itself
    'http://localhost:8080'   // Vue/React default
  ],
  jwtSecret: '',
  jwtExpiresIn: '15m',
  postgres: {
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'postgres',
    db: 'openassistant_dev'
  },
  bcrypt: {
    saltRounds: 10
  }
};

export default environment;
