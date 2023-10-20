import { Component } from '@angular/core';
import {User} from "../../request/User";
import {UserAuthServiceService} from "../../service/user-auth-service.service";
import {Router} from "@angular/router";
import {CookieService} from "ngx-cookie-service";
import {AuthService} from "../../service/auth.service";

@Component({
  selector: 'app-registre-account',
  templateUrl: './registre-account.component.html',
  styleUrls: ['./registre-account.component.css']
})
export class RegistreAccountComponent {
  constructor(private auth: AuthService , private router : Router,private cookieService: CookieService) {
  }
  user = new User();
  CreateClient() {
      console.log(this.user)
      this.auth.addClient(this.user).subscribe(data=>{console.log("ok");this.router.navigate(['/login']);})}
}
