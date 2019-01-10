import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, from, Subject } from 'rxjs';
import { EntryModel } from 'src/app/models/entrymodel';
import { Storage} from '@ionic/storage';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class FlashcardService {

  // constructor(private http: HttpClient){}

  localData: EntryModel[];
  defaultEntries = 5;
  private keys = {
    entries: 'entries'
  };
  isChanged: Subject<void>;

  constructor(private storage: Storage) {
    for (let i = 0; i < this.defaultEntries; i ++) {
      this.localData.push(DICTIONARY[i]);
    }
  }

  // Will listen to the speach and checks and gets the text
  getTextFromSpeach(): string {
    return 'just text';
  }

  say(localeId: string, word: string) {}

  verify(localeId: string, word: string) {
    this.getTextFromSpeach();
  }

  // sends all the enties
  async getCurrentCards(): Promise<EntryModel []> {
    await this.storage.ready();
    if (this.localData === undefined) {
      this.localData = await this.storage.get(this.keys.entries);
    }
    return this.localData;
  }

  // looks up each entry in DICTIONARY for a given localeid and word
  getEntry(localeId: string, word: string): Observable<EntryModel> {
    return from(
      this.getCurrentCards().then(data => {
        return Promise.resolve(this.findWord(localeId, word, data));
      })
    );
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

  // adds a card to the array and returns the new entry
  async addCard(localeId: string, word: string): Promise<void> {
    return this.getEntry(localeId, word).pipe(map((e: EntryModel) => {
      if (e === undefined || e == null) {
        this.save(e);
      } else {
        Promise.resolve(e);
      }
    })).toPromise();
  }

  // removes a given entry/card from the array of data
  async removeCard(entry: EntryModel): Promise<void> {
    await this.storage.ready();
    for ( let i = 0; i < this.localData.length; i ++) {
      if (this.localData[i].entryId === entry.entryId) {
        this.localData.splice(i, 1);
        break;
      }
    }
    this.storage.set(this.keys.entries, this.localData);
    this.isChanged.next();
  }


  // saves the local data to a storage when an entry is added or removed
  async save(entry: EntryModel): Promise<void> {
    await this.storage.ready();
    this.localData.push(entry);
    this.storage.set(this.keys.entries, this.localData);
    this.isChanged.next();
  }
}
