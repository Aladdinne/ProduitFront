import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {



  constructor(
    private route: Router, private cookieService: CookieService) {
  }


  email = this.cookieService.get("username") ;
  username = this.email.split('@')[0];

}
