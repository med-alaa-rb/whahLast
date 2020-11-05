import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",

})
export class LocalService {
  // connected user name
  message: any;
  // profile searched data
  otherProfile: any;
  // one post
  onePost: any;
  // profile company data
  companyInfo: any = {};
  // training center profile data
  tsInfo: any = {};
  // post data
  post: any;
  // reported post data
  reported: any;
  // data of user 
  user : any ; 
  // protected routes
  redirected : boolean = false ;
  
  constructor() {}
}
