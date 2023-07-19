import { ActivatedRoute, Router } from '@angular/router';
import { DeviceService } from './../_services/device.service';
import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import {HistoriqueService} from "../_services/historique.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-device-details',
  templateUrl: './device-details.component.html',
  styleUrls: ['./device-details.component.css']
})
export class DeviceDetailsComponent {

  id!: string;
  device!: any;
  sensorList !: any;
  startDate = new Date();
  endDate = new Date();

  constructor(private DeviceService: DeviceService, private router: Router,
              private cookieService: CookieService, private sv: HistoriqueService,
              private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      console.log(this.id);

    });
    console.log("heeee");

    this.DeviceService.DeviceDetails(this.id).subscribe(data => {
      this.device = data;
    });
    this.DeviceService.DeviceSensor(this.id).subscribe(data => {
      this.sensorList = data;

    });
  }
}
