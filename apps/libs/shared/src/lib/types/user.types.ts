export type User = {
  id: number;
  username: string;
  password?: string;
  // The salt used to generate the password hash
  salt?: string;
  access_token?: string;
};


export type AuthCredentials = Pick<User, 'username' | 'access_token'>
