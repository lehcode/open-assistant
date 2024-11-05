
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { BaseResponse, LoginResponse } from '@types'

class AuthService {
  private apiUrl = 'http://localhost:3000/api/v1';

  /**
   * Log in with the given credentials.
   *
   * The function will make a POST request to the login endpoint with the given
   * credentials and return the response as an observable. If the login is
   * successful, the response will contain the user's token and username. If the
   * login fails, the response will contain an error message.
   *
   * @param {any} credentials - The credentials to use for the login.
   * @returns {Observable<LoginResponse | BaseResponse>} - The response as an observable.
   */
  async login(credentials: any): Promise<LoginResponse | BaseResponse> {
    try {
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

  storeUserToken(username: string, token: string): void {
    localStorage.setItem(username, token);
  }
}

export default AuthService;
