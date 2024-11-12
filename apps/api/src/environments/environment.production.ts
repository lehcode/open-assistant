
import { IDevEnvironment } from "./environment";

// eslint-disable-next-line @typescript-eslint/no-empty-interface,@typescript-eslint/no-empty-object-type
interface IProdEnvironment extends IDevEnvironment {}
type ProdEnvironment = IProdEnvironment

const environment: ProdEnvironment = {
  production: true,
  corsOrigins: [
    'http://localhost:4200', // Angular default
    'http://localhost:3000', // API itself
    'http://localhost:8080' // Vue/React default
  ],
  jwtExpiresIn: '1h',
  // postgres: {
  //   host: 'localhost',
  //   port: 5432,
  //   username: 'postgres',
  //   password: 'postgres',
  //   db: 'openassistant'
  // },
  bcrypt: {
    saltRounds: 10
  }
};

export default environment;
