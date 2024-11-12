import { IApiErrorResponse, IAuthCredentials, LoginRequest, LoginResponse, SafeUser, User } from '@lib/shared';
import { HttpStatus } from '@nestjs/common';
import { Ref, ref } from 'vue';
import { AuthService } from '../services/auth.service';
import { useUserStore } from '../stores/user.store';


const authService = new AuthService();

const user = ref<SafeUser>({
  id: 0,
  username: '',
});

const provideLogin = async (
  formData: LoginRequest
): Promise<LoginResponse<IAuthCredentials> | IApiErrorResponse | undefined> => {
  try {
    const response = (await authService.login(formData)).data;

    console.log(response);

    if (response.success) {
      return {
        success: response.success,
        statusCode: response.statusCode,
        data: { ...response.data },
      } as LoginResponse<IAuthCredentials>;
    } else {
      return {
        success: response.success,
        statusCode: response.statusCode,
        error: 'Invalid response',
      };
    }
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
  user: Ref<Omit<User, 'password' | 'salt'>>;
  isAuthenticated: boolean;
  provideLogin: typeof provideLogin;
} => {
  return {
    user,
    isAuthenticated: useUserStore().authenticated,
    provideLogin,
  };
};

export { useAuth };
