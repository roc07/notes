import { Component, OnInit } from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {AuthenticationService} from '../services/authentication/authentication.service';
import {Router} from '@angular/router';
import {HomeService} from '../services/home/home.service';
import {AppPaths} from '../shared/app.paths';
import {SessionService} from '../session/state/session.service';

@Component({
  selector: 'app-authenticate',
  templateUrl: './authenticate.component.html',
  styleUrls: ['./authenticate.component.css']
})
export class AuthenticateComponent implements OnInit {

  token = '';
  loginForm = this.formBuilder.group({
    username: '',
    password: ''
  });

  constructor(private formBuilder: FormBuilder, private authenticationService: AuthenticationService,
              private router: Router, private homeService: HomeService, private sessionService: SessionService) { }

  ngOnInit(): void {

  }

  authenticate(): void {
    this.authenticationService
      .authenticate({username: this.loginForm.value.username, password: this.loginForm.value.password})
      .subscribe(result => {
          console.log(result.userId + ' _ ' + result.token);
          this.sessionService.createUserStore(result.userId, result.token);
          this.router.navigate([AppPaths.notes]);
        },
        error => console.log(error.status));
  }

  goToRegistration(): void {
    this.router.navigate([AppPaths.register]);
  }

  testSecurity(): void {
    this.homeService.testSecurity(this.token)
      .subscribe(result =>
        console.log(result)
      );
  }

}
