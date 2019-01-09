import { Injectable } from '@angular/core';
import { Coordinate } from 'src/app/models/coordinate';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Platform } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor(private geolocation: Geolocation, private platform: Platform) { }
  private defaultPosition = {
    coords: {
      // latitude: 43.073051,
      // longitude: -89.40123
      latitude: 38.955285,
      longitude: -77.393326
    }
  };

  // current(): Promise<Coordinate> {
  //   return this.geolocation.getCurrentPosition().then(loc => ({
  //     latitude: loc.coords.latitude,
  //     longitude: loc.coords.longitude
  //   }));
  // }

  async current(): Promise<Coordinate> {
    const loc = this.platform.is('cordova')
      ? await this.geolocation.getCurrentPosition()
      : await this.getCurrentPositionWebApi();
    return {
      longitude: loc.coords.longitude,
      latitude: loc.coords.latitude
    };
  }

  private getCurrentPositionWebApi(): Promise<{
    coords: { latitude: number; longitude: number };
  }> {
    if ('geolocation' in navigator) {
      return new Promise((resolve, reject) =>
        navigator.geolocation.getCurrentPosition(
          p => resolve(p),
          err => reject(err)
        )
      );
    }
    return Promise.resolve(this.defaultPosition);
  }
}
