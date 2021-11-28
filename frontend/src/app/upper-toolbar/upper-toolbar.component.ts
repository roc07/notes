import { Component, OnInit } from '@angular/core';
import {faSignOutAlt, faSignInAlt} from '@fortawesome/free-solid-svg-icons';
import {ToolbarService} from '../services/toolbar/toolbar.service';
import {SessionService} from '../session/state/session.service';
import {Router} from '@angular/router';
import {AppPaths} from '../shared/app.paths';
import {GeneralUtil} from '../services/shared/util/general.util';

@Component({
  selector: 'app-upper-toolbar',
  templateUrl: './upper-toolbar.component.html',
  styleUrls: ['./upper-toolbar.component.css']
})
export class UpperToolbarComponent implements OnInit {

  faSignOut = faSignOutAlt;
  faSignIn = faSignInAlt;
  signedIn = false;
  generalUtil = new GeneralUtil(this.sessionService, this.router);

  constructor(public toolbarService: ToolbarService, private sessionService: SessionService, private router: Router) { }

  ngOnInit(): void {
    this.prepareSignedIn();
  }

  signOut(): void {
    this.sessionService.fullSessionClear();
    this.prepareSignedIn();
    this.router.navigate([AppPaths.home]);
  }

  signIn(): void {
    this.prepareSignedIn();
    this.router.navigate([AppPaths.home]);
  }

  public prepareSignedIn(): void {
    this.signedIn = this.generalUtil.stringIsInvalid(this.sessionService.getRawToken());
  }

}
