// This file should not be modified directly - use specific environment files instead
export interface IDevEnvironment {
  production: boolean;
  corsOrigins: string[];
  jwtExpiresIn: string;
  bcrypt: {
    saltRounds: number;
  }
}

const environment: IDevEnvironment = {
  production: false,
  corsOrigins: [
    'http://localhost:4200',  // Angular default
    'http://localhost:3000',  // API itself
    'http://localhost:8080'   // Vue/React default
  ],
  jwtExpiresIn: '15m',
  // postgres: {
  //   host: 'localhost',
  //   port: 5432,
  //   username: 'postgres',
  //   password: 'postgres',
  //   db: 'openassistant_dev'
  // },
  bcrypt: {
    saltRounds: 10
  }
};

export default environment;
