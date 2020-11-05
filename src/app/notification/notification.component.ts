import { Component, OnInit } from "@angular/core";
import { HttpService } from "../http.service";
import { LocalService } from "../local.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-notification",
  templateUrl: "./notification.component.html",
  styleUrls: ["./notification.component.css"],
})
export class NotificationComponent implements OnInit {
  application: any;
  compName : any ;
  constructor(
    private _http: HttpService,
    private local: LocalService,
    private router: Router
  ) {}

  ngOnInit(): void {
    var obj = { owner: this.local.companyInfo.owner };
    this.compName = this.local.message
    this._http.httpGetApplications(obj).subscribe((data) => {
      this.application = data;
      console.log(data);
    });
  }
  accept(id, name) {
    var obj = { 
      'id' : id ,
      'name' : name ,
      'compName' : this.local.message
    };

    this._http.httpacceptApp(obj).subscribe((data) => {
      console.log(data);
      this.ngOnInit();
    });

  }
  reject(id) {
    var obj = { id };
    this._http.httpdeleteApplication(obj).subscribe((data) => {
      this.ngOnInit();
    });
  }
  backToProfile() {
    this.router.navigateByUrl("company/profile");
  }
  searchProfil(profilName) {
    this._http.findProfil({ profilName }).subscribe((res) => {
      this.local.otherProfile = res;
      this.router.navigateByUrl("/resultSearch");
    });
  }
  ///////////////////////// redirect user //////////////////
  feed() {
    this.router.navigateByUrl("/post/company");
  }
  ownPosts() {
    this.router.navigateByUrl("/companyOwnPost");
  }
  studentApply() {
    this.router.navigateByUrl("notification");
  }
}
