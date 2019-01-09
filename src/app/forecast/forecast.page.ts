import { Component, OnInit, OnDestroy } from '@angular/core';
import { Forecast } from '../models/forecast';
import { IconMapService } from '../services/icon-map/icon-map.service';
import { WeatherService } from '../services/weather/weather.service';
import { UserPreferencesComponent } from '../user-preferences/user-preferences.component';
import { ModalController, LoadingController } from '@ionic/angular';
import { UserPreferencesService } from '../services/user-preferences/user-preferences.service';
import { Subscription } from 'rxjs';
import { NetworkService } from '../services/network/network.service';

@Component({
  selector: 'app-forecast',
  templateUrl: 'forecast.page.html',
  styleUrls: ['forecast.page.scss']
})
export class ForecastPage implements OnInit, OnDestroy {

  scale: string;

  private subscription: Subscription;

  constructor(public iconMap: IconMapService,
    private weather: WeatherService,
    private modal: ModalController,
    private userPref: UserPreferencesService,
    private loading: LoadingController,
    public network: NetworkService) {}
  forecast: Forecast; // = [
  //   [
  //     {
  //       temperature: 300,
  //       condition: 200,
  //       date: new Date(2018, 8, 19)
  //     }
  //   ],
  //   [
  //     {
  //       temperature: 265,
  //       condition: 601,
  //       date: new Date(2018, 8, 20)
  //     }
  //   ],
  //   [
  //     {
  //       temperature: 293,
  //       condition: 800,
  //       date: new Date(2018, 8, 21)
  //     }
  //   ]
  // ];

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
  //   // this.weather.forecast().subscribe(w => (this.forecast = w));
  //   const l = await this.loading.create({
  //     message: 'Loading...'
  //   });
  //   l.present();
  //   this.scale = (await this.userPref.getUseCelcius()) ? 'C' : 'F';
  //   this.weather.forecast().subscribe(w => {
  //     this.forecast = w;
  //     l.dismiss();
  //   });
  // }

  private async getData() {
    if (this.network.onLine) {
      const l = await this.loading.create({
        message: 'Loading...'
      });
      l.present();
      this.scale = (await this.userPref.getUseCelcius()) ? 'C' : 'F';
      this.weather.forecast().subscribe(w => {
        this.forecast = w;
        l.dismiss();
      });
    }
  }

  async openUserPreferences(): Promise<void> {
    const m = await this.modal.create({ component: UserPreferencesComponent });
    await m.present();
  }
}
