import { Injectable, computed, inject, signal } from '@angular/core';
import { Observable, catchError, of, switchMap, tap, throwError } from 'rxjs';

import { Player } from '../models/player.model';
import { PlayerService } from './player.service';

const STORAGE_KEY = 'lyceum.userId';

/**
 * Reactive user/session state. Holds the logged-in player as a signal, restores the
 * session from localStorage on startup, and performs find-or-create login by email.
 */
@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly players = inject(PlayerService);

  private readonly _currentUser = signal<Player | null>(null);
  readonly currentUser = this._currentUser.asReadonly();
  readonly isAuthenticated = computed(() => this._currentUser() !== null);

  readonly loading = signal(false);
  readonly error = signal<string | null>(null);

  constructor() {
    this.restore();
  }

  /** Find-or-create a player by email, then set them as the current user. */
  login(name: string, email: string): Observable<Player> {
    this.loading.set(true);
    this.error.set(null);

    return this.players.findByEmail(email).pipe(
      switchMap((found) => {
        if (found.length) {
          const existing = found[0];
          return existing.name === name
            ? of(existing)
            : this.players.update(existing.id!, { name });
        }
        return this.players.create({
          name,
          email,
          bestScore: 0,
          bestTimeMs: 0,
          lastPlayedAt: null,
        });
      }),
      tap((player) => {
        this._currentUser.set(player);
        this.persistId(player.id ?? null);
        this.loading.set(false);
      }),
      catchError((err) => {
        this.loading.set(false);
        this.error.set('შესვლა ვერ მოხერხდა. სცადე თავიდან.');
        return throwError(() => err);
      })
    );
  }

  /** Merge updated stats into the current user after a saved result. */
  applyResult(patch: Partial<Player>): void {
    const user = this._currentUser();
    if (!user) return;
    this._currentUser.set({ ...user, ...patch });
  }

  logout(): void {
    this._currentUser.set(null);
    this.error.set(null);
    this.persistId(null);
  }

  private restore(): void {
    const id = this.readStoredId();
    if (!id) return;
    this.players.getById(id).subscribe({
      next: (player) => this._currentUser.set(player),
      error: () => this.persistId(null),
    });
  }

  private readStoredId(): string | null {
    try {
      return localStorage.getItem(STORAGE_KEY);
    } catch {
      return null;
    }
  }

  private persistId(id: string | null): void {
    try {
      if (id) localStorage.setItem(STORAGE_KEY, id);
      else localStorage.removeItem(STORAGE_KEY);
    } catch {
      /* storage unavailable — session simply won't persist */
    }
  }
}
