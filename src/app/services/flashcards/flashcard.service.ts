import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, from, Subject } from 'rxjs';
import { EntryModel } from 'src/app/models/entrymodel';
import { Storage} from '@ionic/storage';
import { map } from 'rxjs/operators';
import { saveConfig } from '@ionic/core';
import { resolve } from 'dns';


@Injectable({
  providedIn: 'root'
})
export class FlashcardService {

  // constructor(private http: HttpClient){}

  entries: EntryModel[];
  defaultEntries: EntryModel[];
  defaultNumberOfEntries = 5;
  private keys = {
    entries: 'entries'
  };
  isChanged: Subject<void>;

  constructor(private storage: Storage) {
    for (let i = 0; i < this.defaultNumberOfEntries; i ++) {
      this.defaultEntries.push(DICTIONARY[i]);
    }
  }

  // Will listen to the speach and checks and gets the text
  getTextFromSpeach(): string {
    return 'just text';
  }

  say(localeId: string, word: string) {

  }

  verify(localeId: string, word: string) {
    this.getTextFromSpeach();
  }

  // sends all the enties
  async getCurrentCards(): Promise<EntryModel []> {
    await this.storage.ready();
    if (this.entries === undefined) {
      this.entries = await this.storage.get(this.keys.entries);
      if (!this.entries) {
        this.entries = this.defaultEntries;
      }
    }
    return this.entries;
  }

  // looks up each entry in DICTIONARY for a given localeid and word
  // getEntry(localeId: string, word: string): Observable<EntryModel> {
  //   return from(
  //     this.getCurrentCards().then(data => {
  //       return Promise.resolve(this.findWord(localeId, word, data));
  //     })
  //   );
  // }

  async getEntry(localeId: string, word: string): Promise<EntryModel> {
    await this.getCurrentCards();
    return this.findWord(localeId, word, this.entries);
  }

  private findWord(localeId: string, word: string, entries: EntryModel[]): EntryModel {
    entries.forEach(e => {
      e.wordModels.forEach(w => {
        if (w.localeId === localeId && w.word === word) {
          return w;
        }
      });
    });

    // If the local data does not have the value then lookup in dictionary
    DICTIONARY.forEach(e => {
      e.wordModels.forEach(w => {
        if (w.localeId === localeId && w.word === word) {
          return w;
        }
      });
    });

    return null;
  }

  async addCard(localeId: string, word: string): Promise<void> {
    let entry = await this.getEntry(localeId, word);
    if (!entry || entry == null) {
      entry = {entryId: this.entries.length,
        wordModels: [
          {localeId, word},
          {localeId, word}
        ]
      };

      this.entries.push(entry);
      this.save();
    }
  }


  // removes a given entry/card from the array of data
  async removeCard(entry: EntryModel): Promise<void> {
    await this.storage.ready();
    for ( let i = 0; i < this.entries.length; i ++) {
      if (this.entries[i].entryId === entry.entryId) {
        this.entries.splice(i, 1);
        break;
      }
    }
    this.save();
    this.isChanged.next();
  }


  // saves the local data to a storage when an entry is added or removed
  async save(): Promise<void> {
    await this.storage.ready();
    this.storage.set(this.keys.entries, this.entries);
    this.isChanged.next();
  }
}
