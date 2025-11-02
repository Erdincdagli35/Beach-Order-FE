import { Injectable } from '@angular/core';

@Injectable()
export class TokenService {
  private accessKey = 'accessToken';
  private refreshKey = 'refreshToken';

  setAccessToken(token: string) { localStorage.setItem(this.accessKey, token); }
  getAccessToken(): string | null { return localStorage.getItem(this.accessKey); }
  setRefreshToken(token: string) { localStorage.setItem(this.refreshKey, token); }
  getRefreshToken(): string | null { return localStorage.getItem(this.refreshKey); }
  clear() { localStorage.removeItem(this.accessKey); localStorage.removeItem(this.refreshKey); }
  isLoggedIn(): boolean { return !!this.getAccessToken(); }
}
