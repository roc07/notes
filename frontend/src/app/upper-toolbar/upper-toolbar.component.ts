import { Component, OnInit } from '@angular/core';
import {faSignOutAlt, faSignInAlt} from '@fortawesome/free-solid-svg-icons';
import {ToolbarService} from '../services/toolbar/toolbar.service';

@Component({
  selector: 'app-upper-toolbar',
  templateUrl: './upper-toolbar.component.html',
  styleUrls: ['./upper-toolbar.component.css']
})
export class UpperToolbarComponent implements OnInit {

  faSignOut = faSignOutAlt;
  faSignIn = faSignInAlt;
  signedIn = false;

  constructor(public toolbarService: ToolbarService) { }

  ngOnInit(): void {

  }

}
