import { Component, OnInit, AfterViewInit } from '@angular/core';
import { DeviceService } from '../_services/device.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import * as L from 'leaflet';
import { LatLngExpression, Marker } from 'leaflet';

@Component({
  selector: 'app-device-liste',
  templateUrl: './device-liste.component.html',
  styleUrls: ['./device-liste.component.css'],
})
export class DeviceListeComponent implements OnInit {
  search: string = '';
  DeviceListe!: any;
  Liste!:any;
  private map!: L.Map;
  clickedMarker: L.Marker | null = null;
  options: any;

  constructor(
    private DVL: DeviceService,
    private router: Router,
    private cookieService: CookieService
  ) {}

  ngOnInit() {
    this.map = L.map('map').setView([34.8333, 9.5333], 6);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(this.map);
    // Load the device list based on the user's role
    if (this.cookieService.get('Role') === 'ADMIN') {
      this.DVL.AdminDeviceList(this.cookieService.get('id')).subscribe(
        (data: any) => {
          this.DeviceListe = data;
          this.Liste=data;
          console.log('ADMINNN');
          data.forEach((element: any) => {
            console.log(element);

            data.forEach((element: any) => {
              console.log(element);
              this.DeviceListe.forEach((device: any) => {
                const latLng: LatLngExpression = [device.lat, device.lng];
                const marker: Marker = L.marker(latLng).addTo(this.map);
                const popupContent = `
          <div style="width: 200px">
            <h4>${device.nom}</h4>
            <p>${device.description}</p>
          </div>
        `;
                marker.bindPopup(popupContent);
              });
            });

          });
        }
      );
    } else if (this.cookieService.get('Role') === 'SUPER_ADMIN') {
      console.log('SUPER_ADMIN');
      this.DVL.DeviceListe().subscribe((data: any) => {
        this.DeviceListe = data;
        this.Liste= data;

        data.forEach((element: any) => {
          console.log(element);
          this.DeviceListe.forEach((device: any) => {
            const latLng: LatLngExpression = [device.lat, device.lng];
            const marker: Marker = L.marker(latLng).addTo(this.map);
            const popupContent = `
          <div style="width: 200px">
            <h4>${device.nom}</h4>
            <p>${device.description}</p>
          </div>
        `;

            marker.bindPopup(popupContent);
          });
        });
      });
    }
  }

  showDeviceLocation(device: any) {
    const latLng: LatLngExpression = [device.lat, device.lng];
    this.map.setView(latLng, 13);
  }
  filterDevice() {
    this.DeviceListe = this.Liste.filter((device: any) => { // Explicitly specify the type as 'any'
      for (let key in device) {
        const value = device[key];
        if (value && value.toString().toLowerCase().includes(this.search.toLowerCase())) {
          return true;
        }
      }
      return false;
    });
  }

}
