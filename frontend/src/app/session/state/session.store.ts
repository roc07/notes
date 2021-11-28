import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';

export interface SessionState {
  userId: number;
  token: string | null;
  username: string;
}

export function createInitialState(): SessionState {
 return {
   userId: -1,
   token: '',
   username: ''
 };
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'session' })
export class SessionStore extends Store {

  constructor() {
    super(createInitialState());
  }

}

