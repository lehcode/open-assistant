
export interface IDevEnvironment {
  production: boolean;
  bcrypt: {
    saltRounds: number;
  };
  jwtConstants: {
    secret: string;
    jwtExpiresIn: string;
    refreshExpiresIn: string;
  };
  http: {
    corsOrigins: string[];
    port: number;
  }
}

const httpConfig = {
  port: 2995,
  corsOrigins: [
    'http://localhost:4200', // Angular default
    'http://localhost:3000', // API itself
    'http://localhost:8080',
  ],
};

export const jwtConfig = {
  jwtConstants: {
    secret: 'environments-dev-secret-key',
    jwtExpiresIn: '1h',
    refreshExpiresIn: '2h'
  }
};

const environment: IDevEnvironment = {
  production: false,
  bcrypt: {
    saltRounds: 5
  },
  http: httpConfig,
  ...jwtConfig
};

export default environment;
