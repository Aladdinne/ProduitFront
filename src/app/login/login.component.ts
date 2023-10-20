import { Component } from '@angular/core';
import {Login} from "../request/login";
import {Router} from "@angular/router";
import {CookieService} from "ngx-cookie-service";
import {UserAuthServiceService} from "../service/user-auth-service.service";
import {AuthService} from "../service/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  login!:Login
  constructor(private auth: AuthService, private userauth: UserAuthServiceService,
              private route: Router, private cookieService: CookieService) {
    console.log("***********************")
    this.login = new Login();
  }
  submit() {
    this.auth.login(this.login).subscribe((data: any) => {
      this.cookieService.set('Token', data.accessToken);
      this.cookieService.set('Role', data.roles);
      this.cookieService.set('id', data.id);
      this.route.navigate(['/products']);})
  }

}
