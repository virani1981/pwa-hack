import { Component, OnInit, OnDestroy } from '@angular/core';
import { Weather } from '../models/weathermode';
import { IconMapService } from '../services/icon-map/icon-map.service';
import { WeatherService } from '../services/weather/weather.service';
import { UserPreferencesComponent } from '../user-preferences/user-preferences.component';
import { ModalController, LoadingController } from '@ionic/angular';
import { UserPreferencesService } from '../services/user-preferences/user-preferences.service';
import { Subscription } from 'rxjs';
import { NetworkService } from '../services/network/network.service';



@Component({
  selector: 'app-current-weather',
  templateUrl: 'current-weather.page.html',
  styleUrls: ['current-weather.page.scss']
})
export class CurrentWeatherPage implements OnInit, OnDestroy {
  currentWeather: Weather; // = {
    // temperature: 302,
    // condition: 200
  // };
  cityName: string;
  scale: string;

  private subscription: Subscription;

  constructor(public iconMap: IconMapService,
    private weather: WeatherService,
    private modal: ModalController,
    private userPref: UserPreferencesService,
    private loading: LoadingController,
    public network: NetworkService ) {}

  ngOnInit(): void {
    this.subscription = this.userPref.changed.subscribe(() => {
      this.getData();
    });
  }

  ionViewDidEnter() {
    this.getData();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  // async ionViewDidEnter() {
  //   // this.weather.current().subscribe(w => (this.currentWeather = w));
  //   const l = await this.loading.create({
  //     message: 'Loading...'
  //   });
  //   l.present();
  //   this.cityName = (await this.userPref.getCity()).name;
  //   this.scale = (await this.userPref.getUseCelcius()) ? 'C' : 'F';
  //   this.weather.current().subscribe(w => {
  //     this.currentWeather = w;
  //     l.dismiss();
  //   });

  // }

  async openUserPreferences(): Promise<void> {
    const m = await this.modal.create({ component: UserPreferencesComponent });
    await m.present();
  }

  private async getData() {
    if (this.network.onLine) {
      const l = await this.loading.create({
        message: 'Loading...'
      });
      l.present();
      this.cityName = (await this.userPref.getCity()).name;
      this.scale = (await this.userPref.getUseCelcius()) ? 'C' : 'F';
      this.weather.current().subscribe(w => {
        this.currentWeather = w;
        l.dismiss();
      });
    }
  }
}
