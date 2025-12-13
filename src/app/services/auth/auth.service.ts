import {computed, inject, Injectable, signal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Observable, tap} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private readonly TOKEN_KEY = 'jwt_token';
  private readonly API_URL = environment.app.apiUrl;
  private httpClient = inject(HttpClient);
  private tokenSignal = signal<string | null>(this.getStoredToken());
  private userSignal = signal<User | null>(null);

  constructor() {
    // Initialize user from token if available
    const token = this.tokenSignal();
    if (token && !this.isTokenExpired(token)) {
      this.loadUserFromToken(token);
    }
  }

  isAuthenticated = computed(() => {
    const token = this.tokenSignal();
    return !!token && !this.isTokenExpired(token);
  });

  currentUser = computed(() => this.userSignal());

  login(email: string, password: string): Observable<AuthResponse> {
    return this.httpClient.post<AuthResponse>(`${this.API_URL}/auth`, { email, password })
      .pipe(
        tap(response => {
          this.setToken(response.token);
        })
      );
  }

  setToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
    this.tokenSignal.set(token);
    this.loadUserFromToken(token);
  }

  getToken(): string | null {
    return this.tokenSignal();
  }

  private getStoredToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    this.tokenSignal.set(null);
    this.userSignal.set(null);
  }

  private loadUserFromToken(token: string): void {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      this.userSignal.set({
        email: payload.email,
        firstName: payload.given_name,
        lastName: payload.family_name
      });
    } catch (e) {
      console.error('Error parsing token:', e);
    }
  }

  private isTokenExpired(token: string): boolean {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const expiry = payload.exp;
      return Math.floor(new Date().getTime() / 1000) >= expiry;
    } catch (e) {
      return true;
    }
  }

}

interface AuthResponse {
  token: string;
}

interface User {
  email: string;
  firstName: string;
  lastName: string;
}


