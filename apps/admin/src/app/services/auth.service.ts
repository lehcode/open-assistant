
import { ApiResponse, IApiErrorResponse, IAuthCredentials, LoginRequest } from '@lib/shared';
import { ConfigService } from '@nestjs/config';
import pinia from "../stores/base.store";
import { useUserStore } from "../stores/user.store";

const userStore = useUserStore(pinia);

export class AuthService {
  private readonly apiHost: string;
  private readonly apiPort: number;
  public readonly apiUrl: string;

  constructor(private readonly configService: ConfigService) {
    this.apiHost = this.configService.get('http.host', '0.0.0.0');
    this.apiPort = this.configService.get('http.port', 3000);
    this.apiUrl = `http://${this.apiHost}:${this.apiPort}/api/v1`;

    if (this.configService.get('http.ssl', true)) {
      this.apiHost = this.configService.get('http.host', 'localhost');
      this.apiPort = this.configService.get('http.port', 443);
      this.apiUrl = `https://${this.apiHost}:${this.apiPort}/api/v1`;
    }
  }

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
      data: result
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
    return !!(localStorage.getItem('authToken') && localStorage.getItem('authUsername') && userStore.authenticated);
  }
}

export default AuthService;

