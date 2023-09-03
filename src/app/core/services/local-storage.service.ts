import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LocalStorageService {
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
}
