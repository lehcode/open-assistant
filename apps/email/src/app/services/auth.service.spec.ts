import { Test, TestingModule } from '@nestjs/testing';
import AuthService from './auth.service'
import { vi } from 'vitest';

describe('AuthService', () => {
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService],
    }).compile();

    authService = module.get<AuthService>(AuthService);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
  });

  it('should return a success response with valid credentials', async () => {
    const mockCredentials = { username: 'testuser', password: 'password123' };
    const mockResponse = {
      success: true,
      token: 'mock-token',
      username: 'testuser',
    };

    global.fetch = vi.fn()
    .mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue(mockResponse),
    });

    const result = await authService.login(mockCredentials);

    expect(global.fetch).toHaveBeenCalledWith(
      'http://localhost:3000/api/v1/auth/login',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(mockCredentials),
      }
    );
    expect(result).toEqual(mockResponse);
  });
});
