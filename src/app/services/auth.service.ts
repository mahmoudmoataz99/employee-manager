import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly STORAGE_KEY = 'employee-management-auth';
  private readonly DEFAULT_EMAIL = 'admin@example.com';
  private readonly DEFAULT_PASSWORD = 'password123';

  isLoggedIn = signal<boolean>(false);

  constructor(private router: Router) {
    this.isLoggedIn.set(localStorage.getItem(this.STORAGE_KEY) === 'true');
  }

  login(email: string, password: string): boolean {
    if (email === this.DEFAULT_EMAIL && password === this.DEFAULT_PASSWORD) {
      localStorage.setItem(this.STORAGE_KEY, 'true');
      this.isLoggedIn.set(true);
      return true;
    }
    return false;
  }

  logout(): void {
    localStorage.removeItem(this.STORAGE_KEY);
    this.isLoggedIn.set(false);
    this.router.navigate(['/login']);
  }
}