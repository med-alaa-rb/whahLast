import { Component, OnInit } from "@angular/core";
import { HttpService } from "../http.service";
import { LocalService } from "../local.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-student-feed",
  templateUrl: "./student-feed.component.html",
  styleUrls: ["./student-feed.component.css"],
})
export class StudentFeedComponent implements OnInit {
  posts: any;

  constructor(
    private _http: HttpService,
    private local: LocalService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // get all the posts
    this._http.httpGetPosts().subscribe((data) => {
      this.posts = data;
    });
  }

  apply(obj) {
    // apply for post
    this._http.applystudent(obj).subscribe((data) => {
      alert(
        "Dear Student , your application is saved , we'll conatct you as soon as possible"
      );
      this.router.navigateByUrl("/studentProfile");
    });
  }
  // see the all the post
  seeMore(post) {
    this.local.onePost = post;
    this.router.navigateByUrl("/post");
  }
  report(post) {
    this.local.reported = post;
    this.router.navigateByUrl("report/post");
  }
  searchProfil(profilName) {
    this._http.findProfil({ profilName }).subscribe((res) => {
      this.local.otherProfile = res[0];
      this.router.navigateByUrl("/resultSearch");
    });
  }
  profile() {
    this.router.navigateByUrl("/studentProfile");
  }
  takeMeToReports() {
    this.router.navigateByUrl("/sendReport");
  }
  feed() {
    this.router.navigateByUrl("/feed/student");
  }
  logOutStudent() {
    this.local.redirected = false;
    console.log(this.local.redirected);
    localStorage.setItem("token", "");
    this.router.navigateByUrl("/");
  }
}
