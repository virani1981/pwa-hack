import { Component, OnInit, OnDestroy } from '@angular/core';
import { UVIndex } from '../models/uvindex';
import { WeatherService } from '../services/weather/weather.service';
import { UserPreferencesComponent } from '../user-preferences/user-preferences.component';
import { ModalController, LoadingController } from '@ionic/angular';
import { UserPreferencesService } from '../services/user-preferences/user-preferences.service';
import { Subscription } from 'rxjs';
import { NetworkService } from '../services/network/network.service';

@Component({
  selector: 'app-uv-index',
  templateUrl: 'uv-index.page.html',
  styleUrls: ['uv-index.page.scss']
})
export class UVIndexPage implements OnInit, OnDestroy {

  private subscription: Subscription;

  constructor(private weather: WeatherService,
    private modal: ModalController,
    private userPref: UserPreferencesService,
    private loading: LoadingController,
    public network: NetworkService) {}
  uvIndex: UVIndex; // = {
  //   value: 6.4,
  //   riskLevel: 3
  // };

  advice: Array<string> = [
    'Wear sunglasses on bright days. If you burn easily, cover up and use broad spectrum SPF 30+ sunscreen. ' +
      'Bright surfaces, such as sand, water and snow, will increase UV exposure.',
    'Stay in the shade near midday when the sun is strongest. If outdoors, wear sun protective clothing, ' +
      'a wide-brimmed hat, and UV-blocking sunglasses. Generously apply broad spectrum SPF 30+ sunscreen every 2 hours, ' +
      'even on cloudy days, and after swimming or sweating. Bright surfaces, such as sand, water and snow, will increase UV exposure.',
    'Reduce time in the sun between 10 a.m. and 4 p.m. If outdoors, seek shade and wear sun protective clothing, a wide-brimmed hat, ' +
      'and UV-blocking sunglasses. Generously apply broad spectrum SPF 30+ sunscreen every 2 hours, even on cloudy days, ' +
      'and after swimming or sweating. Bright surfaces, such sand, water and snow, will increase UV exposure.',
    'Minimize sun exposure between 10 a.m. and 4 p.m. If outdoors, seek shade and wear sun protective clothing, a wide-brimmed hat, ' +
      'and UV-blocking sunglasses. Generously apply broad spectrum SPF 30+ sunscreen every 2 hours, even on cloudy days, and after ' +
      'swimming or sweating. Bright surfaces, such as sand, water and snow, will increase UV exposure.',
    'Try to avoid sun exposure between 10 a.m. and 4 p.m. If outdoors, seek shade and wear sun protective clothing, a wide-brimmed hat, ' +
      'and UV-blocking sunglasses. Generously apply broad spectrum SPF 30+ sunscreen every 2 hours, even on cloudy days, ' +
      'and after swimming or sweating. Bright surfaces, such as sand, water and snow, will increase UV exposure.'
  ];

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

  // ionViewDidEnter() {
  //   this.weather.uvindex().subscribe(w => (this.uvIndex = w));
  // }
  private async getData() {
    if (this.network.onLine) {
      const l = await this.loading.create({
        message: 'Loading...'
      });
      l.present();
      this.weather.uvindex().subscribe(w => {
        this.uvIndex = w;
        l.dismiss();
      });
    }
  }

  async openUserPreferences(): Promise<void> {
    const m = await this.modal.create({ component: UserPreferencesComponent });
    await m.present();
  }
}
