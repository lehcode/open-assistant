
// import { Observable, of } from 'rxjs';
// import { map, catchError } from 'rxjs/operators';
import { BaseResponse, LoginRequest, LoginResponse } from '@open-assistant/types'

export class AuthService {
  private apiUrl = 'http://localhost:3000/api/v1';

  /**
   * Attempt to log in the user with the given credentials.
   *
   * @param credentials The username and password to use for the login.
   * @returns A promise that resolves to the user data on success, or a
   *          "BaseResponse" object with an error message on failure.
   */
  async login(credentials: LoginRequest): Promise<LoginResponse | BaseResponse> {
    try {
      debugger;
      const response = await fetch(`${this.apiUrl}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        throw new Error(response.statusText);
      }

      const result = await response.json();
      return result;
    } catch (error: any) {
      return { success: false, error: error.message };
    }
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

