import { Injectable } from '@angular/core';

@Injectable()
export class TokenService {
  private accessKey = 'accessToken';
  private refreshKey = 'refreshToken';
  private rolesKey = 'userRoles';

  setAccessToken(token: string) { localStorage.setItem(this.accessKey, token); }
  getAccessToken(): string | null { return localStorage.getItem(this.accessKey); }
  setRefreshToken(token: string) { localStorage.setItem(this.refreshKey, token); }
  getRefreshToken(): string | null { return localStorage.getItem(this.refreshKey); }
  clear() { localStorage.removeItem(this.accessKey); localStorage.removeItem(this.refreshKey); }
  isLoggedIn(): boolean { return !!this.getAccessToken(); }
  setRoles(roles: string[]) { localStorage.setItem(this.rolesKey, JSON.stringify(roles || [])); }
  getRoles(): string[] { 
    const raw = localStorage.getItem(this.rolesKey);
    return raw ? JSON.parse(raw) as string[] : [];
  }

  hasRole(role: string): boolean { return this.getRoles().includes(role); }
}
