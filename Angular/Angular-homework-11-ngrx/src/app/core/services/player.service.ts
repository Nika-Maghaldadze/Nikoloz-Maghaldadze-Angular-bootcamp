import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Player } from '../models/player.model';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class PlayerService {
  private http = inject(HttpClient);
  private readonly base = `${environment.apiUrl}/players`;

  /** All players, for the leaderboard. */
  list(): Observable<Player[]> {
    return this.http.get<Player[]>(this.base);
  }

  /** Fetch a single player by id (used to restore a session). */
  getById(id: string): Observable<Player> {
    return this.http.get<Player>(`${this.base}/${id}`);
  }

  /** Find players matching an email (json-server exact-match filter). */
  findByEmail(email: string): Observable<Player[]> {
    return this.http.get<Player[]>(this.base, { params: { email } });
  }

  create(player: Omit<Player, 'id'>): Observable<Player> {
    return this.http.post<Player>(this.base, player);
  }

  update(id: string, patch: Partial<Player>): Observable<Player> {
    return this.http.patch<Player>(`${this.base}/${id}`, patch);
  }
}
