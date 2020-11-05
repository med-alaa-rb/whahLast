import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tcsignup',
  templateUrl: './tcsignup.component.html',
  styleUrls: ['./tcsignup.component.css'],
})
export class TcsignupComponent implements OnInit {
  constructor(private _http: HttpService, private router: Router) {}

  ngOnInit(): void {}
  // redirect to sign in
  signin() {
    this.router.navigateByUrl('/signin/center');
  }
  // sign up Training center
  addTC(name, password ,email) {
    var obj = { name, password ,email};
    this._http.registerTC(obj).subscribe((data) => {
      this.router.navigateByUrl('/signin/center');
    });
  }
}
