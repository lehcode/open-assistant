import { LoginRequest, LoginResponse, User } from '@lib/shared';
import { Ref, ref } from 'vue';
import { AuthService } from '../services/auth.service';

const authService = new AuthService();

const user = ref<User>({
  id: 0,
  username: ''
});
const isAuthenticated = ref(false);

const provideLogin = async (
  formData: LoginRequest
): Promise<LoginResponse> => {
  let username = '';
  let access_token: string | undefined = undefined;

  try {
    const response = await authService.login(formData);

    if ('access_token' in response && 'username' in response) {
      access_token = response.access_token as string;
      username = response.username as string;
      authService.storeUserToken(username, access_token);
      isAuthenticated.value = true;

      return {
        success: true,
        username,
        access_token,
        error: undefined,
      };
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
  authService.logout();
  isAuthenticated.value = false;
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
