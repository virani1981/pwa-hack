import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { EntryModel } from 'src/app/models/entrymodel';


@Injectable({
  providedIn: 'root'
})
export class FlashcardService {

  // constructor(private http: HttpClient){}

  constructor() {}

  // Will listen to the speach and checks and gets the text
  getTextFromSpeach(): string {
    return 'just text';
  }

  say() {}

  verify() {
    this.getTextFromSpeach();
  }

  // sends all the enties
  getCurrentCards(): EntryModel [] {
    return [];
  }

  getEntry(localeId: string, word: string): EntryModel {
    return null;
  }
  // adds a card to the array and returns the new entry
  addCard() {

  }

  // removes a given entry/card from the array of data
  removeCard() {}


}
