import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class StorageService {
  private readonly twoDaysInMilliseconds = 172800000;

  getData(key: string): string | null {
    return localStorage.getItem(key);
  }

  saveData(key: string, value: string): void {
    localStorage.setItem(key, value);
  }

  remove(keys: string[]): void {
    for (let i = 0; i < keys.length; i++) {
      localStorage.removeItem(keys[i]);
    }
  }

  getDataFormSession(key: string): string | null {
    return sessionStorage.getItem(key);
  }

  saveDataToSession(key: string, value: string): void {
    sessionStorage.setItem(key, value);
  }

  removeFromSession(keys: string[]): void {
    for (let i = 0; i < keys.length; i++) {
      sessionStorage.removeItem(keys[i]);
    }
  }

  saveDataToCookie(key: string, value: string): void {
    const date = new Date(Date.now() + this.twoDaysInMilliseconds);

    document.cookie = `${encodeURIComponent(key)}=${encodeURIComponent(value)}; expires=${date.toUTCString()}`;
  }

  getFormCookie(key: string): string | undefined {
    return document.cookie
      .split('; ')
      .find((row) => row.startsWith(`${key}=`))
      ?.split("=")[1];
  }
}
