import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class StorageService {
  getNumber(key: string, fallback = 0): number {
    try {
      const raw = localStorage.getItem(key);
      const n = raw ? Number(raw) : fallback;
      return Number.isFinite(n) ? n : fallback;
    } catch {
      return fallback;
    }
  }

  setNumber(key: string, value: number): void {
    try {
      localStorage.setItem(key, String(value));
    } catch {}
  }
}
