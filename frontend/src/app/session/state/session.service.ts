import { Injectable } from '@angular/core';
import { SessionStore } from './session.store';
import { SessionQuery } from './session.query';

@Injectable({ providedIn: 'root' })
export class SessionService {

  constructor(private sessionStore: SessionStore, private query: SessionQuery) {
  }

  createUserStore(userId: number, token: string, username: string): void {
    this.sessionStore.update({userId});
    this.sessionStore.update({token});
    this.sessionStore.update({username});
  }

  updateUserId(userId: number): void {
    this.sessionStore.update({userId});
  }

  getRawUserId(): number {
    return this.query.getValue().userId;
  }

  updateToken(token: string): void {
    this.sessionStore.update({token});
  }

  getRawToken(): string {
    return this.query.getValue().token;
  }

  updateUsername(username: string): void {
    this.sessionStore.update({username});
  }

  getUsername(): string {
    return this.query.getValue().username;
  }

  clearFullSession(): void {
    this.sessionStore.update( {
      token: null,
      userId: null,
      username: null
    });
  }
}
