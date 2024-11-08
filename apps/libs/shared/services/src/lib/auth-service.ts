
// import { Observable, of } from 'rxjs';
// import { map, catchError } from 'rxjs/operators';
import { BaseResponse, LoginRequest, LoginResponse } from '@open-assistant/types'

export class AuthService {
  private apiUrl = 'http://localhost:3000/api/v1';

  async login(credentials: LoginRequest): Promise<LoginResponse | BaseResponse> {
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

  isLoggedIn(): boolean {
    return !!localStorage.getItem('authToken');
  }

  storeUserToken(username: string, token: string): void {
    localStorage.setItem('username', username);
    localStorage.setItem('authToken', token);
  }


}

export default AuthService;

