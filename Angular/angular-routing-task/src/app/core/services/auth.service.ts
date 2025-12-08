import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly _isAuthenticated$ = new BehaviorSubject<boolean>(false);
  readonly isAuthenticated$: Observable<boolean> = this._isAuthenticated$.asObservable();
  private readonly USERNAME = 'admin';
  private readonly PASSWORD = '1234';
  login(username: string, password: string): boolean {
    const isValid = username === this.USERNAME && password === this.PASSWORD;
    if (isValid) {
      this._isAuthenticated$.next(true);
    }
    return isValid;
  }
  logout(): void {
    this._isAuthenticated$.next(false);
  }
}
