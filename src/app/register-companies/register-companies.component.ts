import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-companies',
  templateUrl: './register-companies.component.html',
  styleUrls: ['./register-companies.component.css'],
})
export class RegisterCompaniesComponent implements OnInit {
  constructor(private _http: HttpService, private router: Router) {}

  ngOnInit(): void {}
  signin() {
    this.router.navigateByUrl('/signin/company');
  }
  // sing up company
  collectCompanies(name, password, email) {
    var obj = { name, password , email};
    this._http.registerCompanies(obj).subscribe((data) => {
      this.router.navigateByUrl('/signin/company');
    });
  }
}
