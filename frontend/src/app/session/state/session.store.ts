import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';

export interface SessionState {
  userId: number;
  token: string | null;
}

export function createInitialState(): SessionState {
 return {
   userId: -1,
   token: ''
 };
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'session' })
export class SessionStore extends Store {

  constructor() {
    super(createInitialState());
  }

}

