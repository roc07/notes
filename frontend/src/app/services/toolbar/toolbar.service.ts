import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToolbarService {

  visible = true;
  welcomeText = 'Welcome';

  constructor() { }

  hideToolbar(): void {
    this.visible = false;
  }

  showToolbar(): void {
    this.visible = true;
  }

  updateWelcomeText(text: string): void {
    this.welcomeText = text;
  }

}
