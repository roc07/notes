import { Component, OnInit } from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {Router} from '@angular/router';
import {UserService} from '../services/user/user.service';
import {AppPaths} from '../shared/app.paths';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  hidePassword = true;
  showError = false;
  userRegistrationForm = this.formBuilder.group({
    username: '',
    password: ''
  });

  constructor(private formBuilder: FormBuilder, private router: Router, private userService: UserService) { }

  ngOnInit(): void {
  }

  register(): void {
    this.userService.registerUser({username: this.userRegistrationForm.value.username,
      password: this.userRegistrationForm.value.password})
      .subscribe(() => {
          this.goToAuthentication();
        },
        error => {
          this.showError = true;
        });
  }

  goToAuthentication(): void {
    this.router.navigate([AppPaths.home]);
  }

}
