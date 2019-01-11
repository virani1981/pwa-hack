import { Injectable, ANALYZE_FOR_ENTRY_COMPONENTS } from '@angular/core';
import { Subject } from 'rxjs';
import { EntryModel } from 'src/app/models/entrymodel';
import { Storage} from '@ionic/storage';
import { TextToSpeech, TTSOptions } from '@ionic-native/text-to-speech/ngx';
import { Platform } from '@ionic/angular';
import { SpeechRecognition } from '@ionic-native/speech-recognition/ngx';
import { DICTIONARY } from '../../data/dictionary';
import Artyom from '../../../assets/js/artyom/artyom.js';


@Injectable({
  providedIn: 'root'
})
export class FlashcardService {

  // constructor(private http: HttpClient){}

  private keys = {
    entries: 'entries'
  };

  entries: EntryModel[];
  defaultEntries: EntryModel[] = [];
  defaultNumberOfEntries = 5;
  defaultWaitForSpeech = 5000; // seconds

  isChanged: Subject<void>;

  constructor(private storage: Storage,
    public platform: Platform,
    public tts: TextToSpeech,
    public speechRecognition: SpeechRecognition) {
    for (let i = 0; i < this.defaultNumberOfEntries; i ++) {
      this.defaultEntries.push(DICTIONARY[i]);
    }
    this.isChanged = new Subject<void>();
  }

  private getSpeechFromTextNative(localeId: string, word: string) {
    const textOrOptions: TTSOptions = {
      text: word,
      locale: localeId
    };
    this.tts.speak(textOrOptions)
    .then(() => console.log('Success'))
    .catch((reason: any) => console.log(reason));
  }

  private getSpeechFromText(localeId: string, word: string) {
    const artyom = new Artyom();
    artyom.say(word, {
      lang: localeId,
      speed: 0.5
    });
  }

  async say(localeId: string, word: string): Promise<void> {
    this.platform.is('cordova') ?
    await this.getSpeechFromTextNative(localeId, word)
    :
    await this.getSpeechFromText(localeId, word);
  }

  // Will listen to the speach and checks and gets the text
  private getTextFromSpeechNative(localeId): Array<string> {

    let error: any;
    let words: Array<string> = new Array<string>();

    this.speechRecognition.isRecognitionAvailable()
    .then((available: boolean) => {
      console.log(available);
      error = 'No Voice Recognition available';
    });

    if (error) {
      return error;
    }

    this.speechRecognition.hasPermission()
    .then((hasPermission: boolean) => {
      console.log(hasPermission);
      if (!hasPermission) {
        this.speechRecognition.requestPermission()
        .then(
          () => console.log('Granted'),
          () => {
            console.log('Denied');
            error = 'Access Denied';
          }
        );
      }
    });

    if (error) {
      return error;
    }
    this.speechRecognition.startListening()
    .subscribe(
      (matches: Array<string>) => {
        console.log(matches);
        words = matches;
      },
      (onerror) => {
        console.log('error:', onerror);
        error = onerror;
      }
    );

    setTimeout(() => {
      this.speechRecognition.stopListening();
    }, this.defaultWaitForSpeech);

    if (error) {
      return error;
    } else {
      return words;
    }

  }

  private getTextFromSpeech(localeId: string): Array<string> {
    // TODO
    let words: Array<string> = new Array<string>();
    const artyom = new Artyom();
    const settings = {
      continuous: true, // Don't stop never because i have https connection
      onResult: (text) => {
          // Show the Recognized text in the console
          console.log('Recognized text: ', text);
          String.prototype.trim();
          words = String(text).trim().split(' ');
      },
      onStart: () => {
          console.log('Dictation started by the user');
      },
      onEnd: () => {
          alert('Dictation stopped by the user');
      }
    };

    const UserDictation = artyom.newDictation(settings);
    UserDictation.start();
    setTimeout(() => {
      UserDictation.stop();
    }, this.defaultWaitForSpeech);
    return words;
  }

  async verify(localeId: string, word: string): Promise<Array<string>> {
    let words: Array<string> ;
    await this.platform.is('cordova') ?
    words = this.getTextFromSpeechNative(localeId)
    :
    words = this.getTextFromSpeech(localeId);

    return words;
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

  async getEntry(localeId: string, word: string): Promise<EntryModel> {
    await this.getCurrentCards();
    let t = this.findWord(localeId, word, this.entries);
    // console.log(t);
    return t;
  }

  private findWord(localeId: string, word: string, entries: EntryModel[]): EntryModel {
    let found = false;
    let entry: EntryModel;

  // If the local data does not have the value then lookup in dictionary
    DICTIONARY.forEach(e => {
      e.wordModels.filter(w => {
        if (w.localeId.toLocaleLowerCase() === localeId.toLocaleLowerCase()
          && w.word.toLocaleLowerCase() === word.toLocaleLowerCase()) {
          found = true;
          return w;
        }
      });
      if (found) {
        entry = e;
        found = false;
      }
    });

    return entry;
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
    }

    this.entries.push(entry);
    this.save();
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
