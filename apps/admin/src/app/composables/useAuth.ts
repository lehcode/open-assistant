import { IApiErrorResponse, IAuthCredentials, LoginRequest, LoginResponse, User } from '@lib/shared';
import { HttpStatus } from '@nestjs/common';
// import { createPinia } from 'pinia';
import { Ref, ref } from 'vue';
import { AuthService } from '../services/auth.service';
import { useUserStore } from '../stores/user.store';


const authService = new AuthService();
const userStore = useUserStore();

debugger;

const user = ref<User>({
  id: 0,
  username: '',
});
const isAuthenticated = userStore.authenticated;

const provideLogin = async (
  formData: LoginRequest
): Promise<LoginResponse<LoginResponse<IAuthCredentials> | IApiErrorResponse>> => {
  let user_id = 0;
  let username = '';
  let access_token = '';

  try {
    const response = await authService.login(formData);

    if ('access_token' in response && 'username' in response && 'id' in response) {
      const successResponse = response;
      user_id = successResponse.id as number;
      access_token = successResponse.access_token as string;
      username = successResponse.username as string;

      const userData = {
        userId: user_id,
        userName: username,
        accessToken: String(access_token),
      };

      userStore.updateAuthenticated(true);
      userStore.updateCredentials(userData);

      return {
        success: true,
        statusCode: response.statusCode,
        data: userData
      } as LoginResponse<IAuthCredentials>;
    } else if ('error' in response) {
      return {
        success: false,
        statusCode: response.statusCode,
        error: response.error,
      };
    }

    return {
      success: false,
      statusCode: HttpStatus.FORBIDDEN,
      error: 'Invalid response',
    };
  } catch (error: Error | unknown) {
    return {
      success: false,
      statusCode: HttpStatus.FORBIDDEN,
      error: (error as Error).message,
    };
  }
};

const provideLogout = () => {
  authService.logout();
  // isAuthenticated.value = false;
};

const useAuth = (): {
  user: Ref<User>;
  isAuthenticated: boolean;
  provideLogin: typeof provideLogin;
} => {
  return {
    user,
    isAuthenticated,
    provideLogin,
  };
};

export { useAuth };
