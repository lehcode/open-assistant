import React, { createContext, useContext, useState } from 'react';
import AuthService from '../services/auth.service';
import { LoginRequest, LoginResponse, User } from '@types';

interface IAuthContext {
  user: User | null;
  isAuthenticated: boolean;
  // eslint-disable-next-line no-unused-vars
  provideLogin: (formData: LoginRequest) => Promise<LoginResponse>;
  provideLogout: () => void;
}

const AuthContext = createContext<IAuthContext | null>(null);

/**
 * A context provider for authentication state and functions.
 *
 * This context provider will store the user's authentication state and
 * provide functions to login and logout. The login function will store the
 * user's token and mark the user as authenticated. The logout function will
 * remove the user's token and mark the user as not authenticated.
 *
 * @param {React.ReactNode} children - The children to render within the context.
 * @returns {React.ReactElement} - A context provider for authentication state and functions.
 */
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const authService = new AuthService();

  /**
   * Login with the given form data.
   *
   * The function will login with the given form data and store the user's token
   * and mark the user as authenticated if successful. If the login fails, the
   * function will return an error message.
   *
   * @param {LoginRequest} formData - The form data with the username and password.
   * @returns {Promise<LoginResponse>} - A promise with the login response.
   */
  const provideLogin = async (
    formData: LoginRequest
  ): Promise<LoginResponse> => {
    let username = '';
    let token: string | undefined = undefined;

    try {
      const response = await authService.login(formData);

      if ('access_token' in response && 'username' in response) {
        try {
          token = response.access_token as string;
          username = response.username as string;
          authService.storeUserToken(username, token);
          setIsAuthenticated(true);

          return {
            success: true,
            username: username,
            access_token: token,
            error: undefined,
          };
        } catch (error: Error | unknown) {
          return {
            success: false,
            error: (error as Error).message,
          };
        }
      } else if ('error' in response) {
        return {
          success: false,
          error: response.error,
        };
      }

      return {
        success: false,
        error: 'Invalid response',
      };
    } catch (error: Error | unknown) {
      return {
        success: false,
        error: (error as Error).message,
        username: formData.username,
      };
    }
  };

  const provideLogout = () => {
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, provideLogin, provideLogout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): IAuthContext => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
};