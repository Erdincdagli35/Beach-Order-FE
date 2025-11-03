import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TokenService } from './token.service';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { environment } from '../../../enviroments/environment';
import { environment as envProd } from '../../../enviroments/enviroment.prod';

@Injectable()
export class AuthService {
  //private base = environment.apiUrl; // örn: http://localhost:8080
  private base = envProd.authUrl;

  constructor(private http: HttpClient, private token: TokenService) {}

  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.base}/api/auth/login`, { username, password })
      .pipe(tap(res => {
        if (res?.accessToken) this.token.setAccessToken(res.accessToken);
        if (res?.refreshToken) this.token.setRefreshToken(res.refreshToken);
      }));
  }

  logout() {
    const refresh = this.token.getRefreshToken();
    if (refresh) {
      this.http.post(`${this.base}/api/auth/logout`, { refreshToken: refresh }).subscribe({ }); // fire-and-forget
    }
    this.token.clear();
  }

  isLoggedIn(): boolean { return this.token.isLoggedIn(); }
}
