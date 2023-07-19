import { Component, OnInit } from '@angular/core';
import { Sensor } from "../request/sensor";
import { SensorService } from "../_services/sensor.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-sensorlist',
  templateUrl: './sensorlist.component.html',
  styleUrls: ['./sensorlist.component.css']
})
export class SensorlistComponent implements OnInit {
  p: number = 1;

  sensor !: any;
  List !: any;
  search = '';

  constructor(private service: SensorService, private route: Router) {
  }

  ngOnInit() {
    this.SensorList();

  }


  SensorList() {
    this.service.sensorList().subscribe(data => { this.sensor = data; this.List = data });
  }

  DeleteSensor(id: string) {

    this.service.DeleteSensor(id).subscribe(() => this.SensorList());

  }
  filterSensor() {
    this.sensor = this.List.filter((sensor: any) => { // Explicitly specify the type as 'any'
      for (let key in sensor) {
        const value = sensor[key];
        if (value && value.toString().toLowerCase().includes(this.search.toLowerCase())) {
          return true;
        }
      }
      return false;
    });
  }
}
