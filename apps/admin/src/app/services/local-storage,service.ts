export class LocalStorageService {
  storeUserToken(token: string): void {
    localStorage.setItem('authToken', token);
  }

  storeUserUsername(username: string): void {
    localStorage.setItem('authUsername', username);
  }
}
