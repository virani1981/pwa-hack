import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { Weather } from 'src/app/models/weathermode';
import { map, flatMap } from 'rxjs/operators';
import { Forecast } from 'src/app/models/forecast';
import { UVIndex } from '../../models/uvindex';
import { LocationService } from '../location/location.service';
import { Coordinate } from 'src/app/models/coordinate';
import { UserPreferencesService } from '../user-preferences/user-preferences.service';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  private appId = 'f43bbed64800103ddee5246f3faf6e76';  // or use your own API key
  private baseUrl = 'https://api.openweathermap.org/data/2.5';

  // private latitude = 43.073051;
  // private longitude = -89.401230;

  constructor(private http: HttpClient,
    private location: LocationService,
    private userPref: UserPreferencesService) { }

  // currentOld(): Observable<Weather> {

    // return this.http.get(`${this.baseUrl}/weather?lat=${this.latitude}&lon=${
    //       this.longitude
    //     }&appid=${this.appId}`).pipe(map((res: any) => this.unpackWeather(res)));
  // }


  current(): Observable<Weather> {
    return this.getCurrentLocation().pipe(
      flatMap((coord: Coordinate) =>
        this.getCurrentWeather(coord)
      )
    );
  }

  private getCurrentWeather(coord: Coordinate): Observable<Weather> {
    return this.http
      .get(
        `${this.baseUrl}/weather?lat=${coord.latitude}&lon=${
          coord.longitude
        }&appid=${this.appId}`
      )
      .pipe(map((res: any) => this.unpackWeather(res)));
  }

  // forecast(): Observable<Forecast> {
  //   return this.http.get(`${this.baseUrl}/forecast?lat=${this.latitude}&lon=${
  //         this.longitude
  //       }&appid=${this.appId}`).pipe(map((res: any) => this.unpackForecast(res)));
  // }

  forecast(): Observable<Forecast> {
    return this.getCurrentLocation().pipe(
      flatMap((coord: Coordinate) =>
        this.getForecast(coord)
      )
    );
  }

  private getForecast(coord: Coordinate): Observable<Forecast> {
    return this.http
      .get(
        `${this.baseUrl}/forecast?lat=${coord.latitude}&lon=${
          coord.longitude
        }&appid=${this.appId}`
      )
      .pipe(map((res: any) => this.unpackForecast(res)));
  }

  // uvindex(): Observable<UVIndex> {
  //   return this.http.get(`${this.baseUrl}/uvi?lat=${this.latitude}&lon=${
  //         this.longitude
  //       }&appid=${this.appId}`).pipe(map((res: any) => this.unpackUVIndex(res)));
  // }

  uvindex(): Observable<UVIndex> {
    return this.getCurrentLocation().pipe(
      flatMap((coord: Coordinate) =>
        this.getUVIndex(coord)
      )
    );
  }

  private getUVIndex(coord: Coordinate): Observable<UVIndex> {
    return this.http
      .get(
        `${this.baseUrl}/uvi?lat=${coord.latitude}&lon=${
          coord.longitude
        }&appid=${this.appId}`
      )
      .pipe(map((res: any) => this.unpackUVIndex(res)));
  }

  private unpackForecast(res: any): Forecast {
    let currentDay: Array<Weather>;
    let prevDate: number;
    const forecast: Forecast = [];

    res.list.forEach(item => {
      const w = this.unpackWeather(item);
      if (w.date.getDate() !== prevDate) {
        prevDate = w.date.getDate();
        currentDay = [];
        forecast.push(currentDay);
      }
      currentDay.push(w);
    });

    return forecast;
  }

  private unpackWeather(res: any): Weather {
    return {
      temperature: res.main.temp,
      condition: res.weather[0].id,
      date: new Date(res.dt * 1000)
    };
  }

  private unpackUVIndex(res: any): UVIndex {
    let rl: number;
    if (res.value >= 11) {
      rl = 4;
    } else if (res.value >= 8) {
      rl = 3;
    } else if (res.value >= 6) {
      rl = 2;
    } else if (res.value >= 3) {
      rl = 1;
    } else {
      rl = 0;
    }
    return {
      value: res.value,
      riskLevel: rl
    };
  }

  private getCurrentLocation(): Observable<Coordinate> {
    // return from(this.location.current());

    return from(
      this.userPref.getCity().then(city => {
        if (city && city.coordinate) {
          return Promise.resolve(city.coordinate);
        } else {
          return this.location.current();
        }
      })
    );
  }
}
