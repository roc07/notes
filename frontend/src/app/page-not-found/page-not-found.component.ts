import { Component, OnInit } from '@angular/core';
import { AppPaths } from '../shared/app.paths';
import { Router } from '@angular/router';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.css']
})
export class PageNotFoundComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  goToAuthentication(): void {
    this.router.navigate([AppPaths.home]);
  }
}
