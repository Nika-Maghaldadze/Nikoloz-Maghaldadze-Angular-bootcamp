import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';

import { AuthService } from './auth.service';
import { Player } from '../models/player.model';
import { environment } from '../../../environments/environment';

const PLAYERS = `${environment.apiUrl}/players`;

function player(over: Partial<Player> = {}): Player {
  return {
    id: 'p1',
    name: 'ნინო',
    email: 'nino@lyceum.ge',
    bestScore: 96,
    bestTimeMs: 102000,
    lastPlayedAt: null,
    ...over,
  };
}

describe('AuthService', () => {
  let http: HttpTestingController;

  beforeEach(() => {
    try {
      localStorage.clear();
    } catch {
      /* ignore */
    }
    TestBed.configureTestingModule({
      providers: [AuthService, provideHttpClient(), provideHttpClientTesting()],
    });
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    http.verify();
  });

  it('reuses an existing player when the email matches', () => {
    const auth = TestBed.inject(AuthService); // no stored id → no restore request

    let result: Player | undefined;
    auth.login('ნინო', 'nino@lyceum.ge').subscribe((p) => (result = p));

    const find = http.expectOne((r) => r.url === PLAYERS && r.params.get('email') === 'nino@lyceum.ge');
    expect(find.request.method).toBe('GET');
    find.flush([player()]);

    expect(result?.id).toBe('p1');
    expect(auth.isAuthenticated()).toBe(true);
    expect(auth.currentUser()?.name).toBe('ნინო');
  });

  it('creates a new player when no email matches', () => {
    const auth = TestBed.inject(AuthService);

    auth.login('ახალი', 'new@x.com').subscribe();

    http.expectOne((r) => r.url === PLAYERS && r.params.get('email') === 'new@x.com').flush([]);

    const create = http.expectOne((r) => r.method === 'POST' && r.url === PLAYERS);
    expect(create.request.body).toMatchObject({ name: 'ახალი', email: 'new@x.com', bestScore: 0 });
    create.flush(player({ id: 'p9', name: 'ახალი', email: 'new@x.com', bestScore: 0, bestTimeMs: 0 }));

    expect(auth.currentUser()?.id).toBe('p9');
  });

  it('restores a session from localStorage on construction', () => {
    localStorage.setItem('lyceum.userId', 'p1');

    const auth = TestBed.inject(AuthService); // constructor → restore()

    http.expectOne(`${PLAYERS}/p1`).flush(player());

    expect(auth.isAuthenticated()).toBe(true);
    expect(auth.currentUser()?.id).toBe('p1');
  });
});
