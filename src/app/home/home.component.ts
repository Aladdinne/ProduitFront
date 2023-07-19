import { Component } from '@angular/core';
import { UserAuthService } from '../_services/user-auth.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
 
  constructor(  private cookieService: CookieService) {
    console.log("***********************")
  
  }
  role = this.cookieService.get("Role")


 

}
