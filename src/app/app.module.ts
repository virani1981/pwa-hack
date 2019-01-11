import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy, NavParams } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { IonicStorageModule } from '@ionic/storage';
import { Network } from '@ionic-native/network/ngx';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { FlashcardComponent } from "../app/flashcard/flashcard.component";
import { FlippingFlashCardComponent } from './flipping-flash-card/flipping-flash-card.component';
import { DeckComponent } from './deck/deck.component';
import { TextToSpeech } from '@ionic-native/text-to-speech/ngx';
import { SpeechRecognition } from '@ionic-native/speech-recognition/ngx';
import { FrenchFlashcardComponent } from './french-flashcard/french-flashcard.component';


@NgModule({
  declarations: [AppComponent, FlashcardComponent, FlippingFlashCardComponent, DeckComponent, FrenchFlashcardComponent],
  entryComponents: [FlippingFlashCardComponent],
  imports: [BrowserModule, IonicModule.forRoot(),
    HttpClientModule, FormsModule,
    IonicStorageModule.forRoot(),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })],
  providers: [
    StatusBar,
    SplashScreen,
    TextToSpeech,
    SpeechRecognition,
    Geolocation,
    Network,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
