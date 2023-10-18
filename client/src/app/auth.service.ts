import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly USER_COOKIE_NAME = 'authUser'; // Cookie name for user data
  private readonly TOKEN_COOKIE_NAME = 'authToken'; // Cookie name for the authentication token

  constructor() {}

  // Store authentication data (user and token) in cookies
  setAuthData(user: any, token: string, expirationHours: number = 2): void {
    // Store user data in a cookie
    document.cookie = `${this.USER_COOKIE_NAME}=${JSON.stringify(
      user
    )}; expires=${this.getExpirationDate(expirationHours)}; path=/`;

    // Store the authentication token in another cookie
    document.cookie = `${
      this.TOKEN_COOKIE_NAME
    }=${token}; expires=${this.getExpirationDate(expirationHours)}; path=/`;
  }

  // Get user data from the cookie
  getUserData(): any | null {
    const userDataCookie = this.getCookie(this.USER_COOKIE_NAME);
    if (userDataCookie) {
      return JSON.parse(userDataCookie);
    }
    return null;
  }

  // Get authentication token from the cookie
  getAuthToken(): string | null {
    return this.getCookie(this.TOKEN_COOKIE_NAME);
  }

  // Check if the user is authenticated (token exists)
  isAuthenticated(): boolean {
    return !!this.getAuthToken();
  }

  // Remove user data and token (logout)
  logout(): void {
    this.deleteCookie(this.USER_COOKIE_NAME);
    this.deleteCookie(this.TOKEN_COOKIE_NAME);
  }

  // Helper function to get the expiration date
  private getExpirationDate(expirationHours: number): string {
    const expirationDate = new Date();
    expirationDate.setTime(
      expirationDate.getTime() + expirationHours * 60 * 60 * 1000
    );
    return expirationDate.toUTCString();
  }

  // Helper function to get a cookie by name
  private getCookie(cookieName: string): string | null {
    const cookies = document.cookie.split(';');
    for (const cookie of cookies) {
      const [name, value] = cookie.trim().split('=');
      if (name === cookieName) {
        return decodeURIComponent(value);
      }
    }
    return null;
  }

  // Helper function to delete a cookie by name
  private deleteCookie(cookieName: string): void {
    document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  }
}