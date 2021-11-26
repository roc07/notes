import { Injectable } from '@angular/core';
import { SessionStore } from './session.store';
import { SessionQuery } from './session.query';

@Injectable({ providedIn: 'root' })
export class SessionService {

  constructor(private sessionStore: SessionStore, private query: SessionQuery) {
  }

  createUserStore(userId: number, token: string): void {
    this.sessionStore.update({userId});
    this.sessionStore.update({token});
  }

  updateUserId(newUserId: number): void {
    this.sessionStore.update({userId: newUserId});
  }

  getRawUserId(): number {
    return this.query.getValue().userId;
  }

  updateToken(newToken: string): void {
    this.sessionStore.update({token: newToken});
  }

  getRawToken(): string {
    return this.query.getValue().token;
  }

  clearFullSession(): void {
    this.sessionStore.update( {
      token: null,
      userId: null
    });
  }
}
