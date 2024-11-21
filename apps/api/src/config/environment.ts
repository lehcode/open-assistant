
export interface IDevEnvironment {
  production: boolean;
  bcrypt: {
    saltRounds: number;
  };
  auth: {
    app: {
      jwt: {
        secret: string;
        jwtExpiresIn: string;
        refreshExpiresIn: string;
      },
    }
    supabase?: ISupabaseAuth
  };
  http: {
    port: number;
    corsOrigins: string[];
  },
}

export interface ISupabaseAuth {
  url: string;
  key: string;
  jwt: {
    secret: string;
    expiresIn: string;
  }
}

const environment: IDevEnvironment = {
  production: false,
  bcrypt: {
    saltRounds: 5
  },
  http: {
    port: Number(process.env.NEST_API_PORT) || 2995,
    corsOrigins: [
      'http://localhost:4200', // Angular default
      'http://localhost:3000', // API itself
      'http://localhost:8080',
    ],
  },
  auth: {
    app: {
      jwt: {
        secret: 'environments-dev-jwt-secret',
        jwtExpiresIn: '1h',
        refreshExpiresIn: '2h'
      }
    }
  }
};

export default environment;
