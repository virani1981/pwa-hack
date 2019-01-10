import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { EntryModel } from "../app/models/entrymodel";
import { FlashcardService } from "../app/services/flashcards/flashcard.service";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  private entries: Array<EntryModel>;
  private addedWord: String;
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private flashcardService: FlashcardService
  ) {
    this.initializeApp();
    
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleLightContent();
      this.splashScreen.hide();
      if (this.platform.is('android')) {
        this.statusBar.backgroundColorByHexString('#074f8b');
      }
    });
    this.entries = this.flashcardService.getCurrentCards();
    console.log(this.entries);
  }

  removeEntry(entry: EntryModel){
    this.flashcardService.removeCard(/*entry*/);
  }

  addEntry(word: String){
    this.flashcardService.addCard(/*word*/);
  }

}
