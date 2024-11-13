import { ConfigService } from '@nestjs/config';
import { describe, expect, it, vi } from 'vitest';
import AuthService from './auth.service';


describe('AuthService', () => {
  // Mock ConfigService
  const mockConfigService = {
    get: vi.fn((key, defaultValue) => defaultValue)
  } as unknown as ConfigService;
  
  // Create a proper instance of AuthService
  const authService = new AuthService(mockConfigService);
  
  it('should login successfully', async () => {
    const mockCredentials = {
      username: 'testuser',
      password: 'testpassword',
      rememberMe: false
    };

    const mockResponse = {
      success: true,
      statusCode: 200,
      data: {
        userId: 999,
        userName: 'testuser',
        accessToken: 'mockAccessToken',
        refreshToken: 'mockRefreshToken'
      }
    };

    // Mock the global fetch function
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      json: vi.fn().mockResolvedValue(mockResponse.data)
    });

    const result = await authService.login(mockCredentials);

    expect(global.fetch).toHaveBeenCalledWith(`${authService.apiUrl}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(mockCredentials)
    });

    expect(result).toEqual(mockResponse);
  });
});
