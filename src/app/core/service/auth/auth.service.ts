import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isAuthenticated$ = new BehaviorSubject<boolean>(false);
  private currentUser$ = new BehaviorSubject<UserProfile | null>(null);

  constructor() {
    const token = localStorage.getItem('token');
    this.isAuthenticated$.next(!!token);
    if (!!token) {
      this.currentUser$.next({ username: token })
    } else {
      this.currentUser$.next(null);
    }
  }

  public isAuthenticated(): Observable<boolean> {
    //TODO Check token
    return this.isAuthenticated$.asObservable();
  }

  public login(user: string, password: string): Observable<boolean> {
    //TODO actually login
    if (user.startsWith('fail')) {
      return of(false);
    }
    localStorage.setItem('token', user);
    this.isAuthenticated$.next(true);
    this.currentUser$.next({ username: user })
    return of(true);
  }

  public logout(): Observable<void> {
    localStorage.clear();
    this.isAuthenticated$.next(false);
    this.currentUser$.next(null)
    return of();
  }

  public currentUser(): Observable<UserProfile | null> {
    return this.currentUser$.asObservable();
  }

}

export interface UserProfile {
  username: string;
}
