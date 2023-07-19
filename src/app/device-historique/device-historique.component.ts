import { DeviceService } from './../_services/device.service';
import {Component, OnInit} from '@angular/core';
import { SensorService } from '../_services/sensor.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { tick } from '@angular/core/testing';
import {HistoriqueService} from "../_services/historique.service";
import {HttpResponse} from "@angular/common/http";
import {PaginationInstance} from "ngx-pagination";
import {style} from "@angular/animations";

@Component({
  selector: 'app-device-historique',
  templateUrl: './device-historique.component.html',
  styleUrls: ['./device-historique.component.css']
})
export class DeviceHistoriqueComponent implements OnInit{
  id!: string;
  HistoriqueListe!: any;
  device !: any ;
  message : string = "WAITING FOR DATA";
  Sensors:any;
  DataId:any;
  pdf:any;
  startDate = new Date();
  endDate = new Date();
  p="0";
  constructor(private Sensorservice: SensorService, private DeviceService :DeviceService,
  private router: Router,private sv : HistoriqueService,
    private cookieService: CookieService, private route: ActivatedRoute) {
      this.route.params.subscribe(params => {
        this.id = params['id'];
      });
      console.log(this.id);
      console.log(this.message)
      this.DeviceService.DeviceDetails(this.id).subscribe(data =>{
        this.device = data
      })

      this.Sensorservice.HistoriquePageable(this.id,"0").subscribe(data => {
        this.HistoriqueListe = data;
        console.log(data);

        this.DataLoaded() ;
      });

    }
ngOnInit():void {
  this.sv.ListSensor(this.id).subscribe(data=>this.Sensors=data)
}

  DataLoaded(){
    this.message ="DataLoaded";
  }
  generatePDF() {

    this.sv.generateDataSensorHistoriquePdf(this.DataId).subscribe(
      (response: any) => {
        const blob = new Blob([response], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'historique.pdf';
        link.click();
        window.URL.revokeObjectURL(url);
      },
      (error) => {
        // Handle error
      });
  }
  generateDevicePDF() {
    this.sv.generateDeviceHistoriquePdf(this.id,this.startDate,this.endDate).subscribe(
      (response: HttpResponse<Blob>) => {
        const blob = response.body;
        if (blob !== null) {
          const pdfUrl = window.URL.createObjectURL(blob);

          // Open the PDF in a new browser tab
          window.open(pdfUrl);
        } else {
          console.error('Blob is null.');
          // Handle the case when blob is null
        }
      },
      (error: any) => {
        console.error(error); // Output the error to the console
        // Handle the error appropriately
      }
    );
  }
  findBySensor(idS:string){
    if (idS==="Select a Sensor" || idS.length.valueOf()<5){
      this.pdf=null;
    }else {this.pdf="ids"};
    console.log(this.pdf)
    // this.sv.HistoriqueBySensorAndDevice(idS,this.id).subscribe(data=>this.HistoriqueListe=data);
    this.sv.findDataSensorByDeviceAndSensor(idS,this.id).subscribe(data=>{this.DataId=data;console.log(data)});
  }
  nextPage(page:string){
    this.Sensorservice.HistoriquePageable(this.id,page).subscribe(data => {
      this.HistoriqueListe = data;
      console.log(data);

      this.DataLoaded() ;
    });
  }
  exportCSV() {
    const message = 'We will notify you when the file is uploaded.';
    const notificationOptions = {
      body: message
    };

    // Check if the browser supports notifications
    if ('Notification' in window) {
      Notification.requestPermission().then(permission => {
        if (permission === 'granted') {
          // Create and display the notification
          new Notification('Export CSV', notificationOptions);
        }
      });
    }
    this.sv.exportDataToCSV(this.id, this.startDate.toString(), this.endDate.toString()).subscribe(res => {
        const audio = new Audio('/assets/Sound/wrong.mp3');
        audio.play();
        alert(res);
        console.log(res);
        console.log("CSV")
      },
      error => {
        const audio = new Audio('/assets/Sound/wrong.mp3');
        audio.play();
        setTimeout(() => {
          alert("Your file is exported");
          // this.showCustomModal('error-modal');
        }, 500);
        // Handle error case if needed
      });
  }
}
