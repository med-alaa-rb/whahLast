import { Component, OnInit } from "@angular/core";
import { HttpService } from "../http.service";
import { LocalService } from "../local.service";
import { Router } from "@angular/router";
@Component({
  selector: "app-login-tc",
  templateUrl: "./login-tc.component.html",
  styleUrls: ["./login-tc.component.css"],
})
export class LoginTcComponent implements OnInit {
  constructor(
    private _http: HttpService,
    private local: LocalService,
    private router: Router
  ) {}
  token: any = "";
  ngOnInit(): void {}
  // redirect to sign up
  signup() {
    this.router.navigateByUrl("/signup/center");
  }
  loginTC(name, password) {
    const dat = {
      data : name
    }
    this._http.getTcName(dat).subscribe((data)=>{
      console.log(data)
    });
    const obj = {
      name: name,
      password: password
    };
    console.log("this is the obj" , obj )
    // log and acording to the user data redirect him
    this._http.loginTC(obj).subscribe((data) => {
      console.log("dtdtdt" , data)
      if (data) {
        this.token = data["token"];
        localStorage.setItem("token", this.token);
        this._http
          .httpgetCenterState({ name: name })
          .subscribe((data) => {
            this.local.message = data[0].name

            var c1 =
              data[0].verification === "true" &&
              data[0].verRequest === "true" &&
              data[0].firstTime === "false";
            var c2 =
              data[0].verification === "true" &&
              data[0].verRequest === "true" &&
              data[0].firstTime === "true";
            var c3 =
              data[0].verification === "false" &&
              data[0].verRequest === "false" &&
              data[0].firstTime === "true";
            var c4 =
              data[0].verification === "false" &&
              data[0].verRequest === "true" &&
              data[0].firstTime === "true";
            if (c1) {
              this.router.navigateByUrl("/center/profile");
            } else if (c2) {
              this.router.navigateByUrl("/register/center");
            } else if (c3) {
              this.router.navigateByUrl("/verification/request/center");
            } else if (c4) {
              this.router.navigateByUrl("/wait");
            }
          });
      } else {
        alert("wrong password");
      }
    });
  }
  addTC(name, password , email) {
    var obj = { name, password , email};
    console.log(obj)
    this._http.registerTC(obj).subscribe((data) => {
      document.getElementById("id01").style.display = "none";
    });
  }
  sign() {
    document.getElementById("id01").style.display = "block";
  }
}