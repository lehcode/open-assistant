
// import { Observable, of } from 'rxjs';
// import { map, catchError } from 'rxjs/operators';
import { ApiResponse, AuthCredentials, IApiErrorResponse, IAuthCredentials, LoginRequest } from '@lib/shared';

export class AuthService {
  protected apiHost = import.meta.env.VITE_API_HOST || 'localhost';
  protected apiPort = import.meta.env.VITE_API_PORT || 3000;
  private apiUrl = `http://${this.apiHost}:${this.apiPort}/api/v1`;

  /**
   * Attempt to log in the user with the given credentials.
   *
   * @param credentials The username and password to use for the login.
   * @returns A promise that resolves to the user data on success, or a
   *          "BaseResponse" object with an error message on failure.
   */
  async login(credentials: LoginRequest): Promise<ApiResponse<IAuthCredentials> | IApiErrorResponse> {
    const response = await fetch(`${this.apiUrl}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      return { 
        success: false,
        statusCode: response.status,
        error: response.statusText
      };
    }

    const result = await response.json();

    return {
      success: true,
      statusCode: response.status,
      data: result as AuthCredentials
    };
  }


  async logout(): Promise<void> {
    await fetch(`${this.apiUrl}/logout`, { method: 'POST' });
  }

  async getProfile(): Promise<any> {
    const response = await fetch(`${this.apiUrl}/profile`);
    const result = await response.json();
    return result;
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('authToken');
  }

  storeUserToken(username: string, token: string): void {
    localStorage.setItem('username', username);
    localStorage.setItem('authToken', token);
  }


}

export default AuthService;

