import {SessionService} from '../../../session/state/session.service';
import {Router} from '@angular/router';
import {AppPaths} from '../../../shared/app.paths';

export class GeneralUtil {

  constructor(private sessionService: SessionService, private router: Router) { }

  navigateUnregisteredUsersToLoginPage(): void {
    if (this.stringIsInvalid(this.sessionService.getRawToken())) {
      this.router.navigate([AppPaths.home]);
    }
  }

  stringIsInvalid(toTest: string): boolean {
    return !toTest || toTest.length === 0;
  }
}
