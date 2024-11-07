import { LoginRequest, LoginResponse, User } from '@open-assistant/types';
import { Ref, ref } from 'vue';
import { AuthService } from '@open-assistant/services';

const user = ref(null);
const isAuthenticated = ref(false);
const authService = new AuthService();

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
  // setUser(null);
  // setIsAuthenticated(false);
};

const useAuth = (): {
  user: Ref<User>;
  isAuthenticated: Ref<boolean>;
  provideLogin: typeof provideLogin;
} => {
  return {
    user,
    isAuthenticated,
    provideLogin,
  };
};

export { useAuth };
