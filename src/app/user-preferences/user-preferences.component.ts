import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { City } from '../models/city';
import { UserPreferencesService } from '../services/user-preferences/user-preferences.service';


@Component({
  selector: 'app-user-preferences',
  templateUrl: './user-preferences.component.html',
  styleUrls: ['./user-preferences.component.scss']
})
export class UserPreferencesComponent implements OnInit {

  constructor(private modal: ModalController,
    private userPref: UserPreferencesService) { }

  cities: Array<City>;
  city: City;
  useCelcius: boolean;

  ngOnInit() {
  }

  async ionViewDidEnter() {
    this.cities = this.userPref.getAvailableCities();
    this.city = (await this.userPref.getCity());
    this.useCelcius = (await this.userPref.getUseCelcius());
  }

  dismiss() {
    this.modal.dismiss();
  }

  save() {
    this.userPref.setCity(this.city);
    this.userPref.setUseCelcius(this.useCelcius);
    this.modal.dismiss();
  }
}
