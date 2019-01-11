import { Component, OnInit, Input, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { EntryModel } from "../models/entrymodel";
import { FlashcardService} from "../services/flashcards/flashcard.service";
import { WordModel } from '../models/wordmodel';
import { IonIcon } from '@ionic/angular';

export enum VerificationStatus { NONE, CORRECT, INCORRECT }

@Component({
  selector: 'app-flashcard',
  templateUrl: 'flashcard.component.html',
  styleUrls: ['flashcard.component.scss']
})
export class FlashcardComponent {
  constructor(private flashcardService: FlashcardService) { }

  @Input()
  wordModel : WordModel;

  @Output() 
  flipEvent = new EventEmitter<string>();

  @ViewChild('micIcon') micIcon: IonIcon;

  wordModelIndex: number = 0;
  
  verificationStatus: VerificationStatus = VerificationStatus.NONE;


  sayWord(word : string)
  {
    debugger;
      this.flashcardService.say(this.wordModel.localeId, word);
  }  

  verify()
  {    
    this.micIcon.color = "red";
    this.verificationStatus = VerificationStatus.NONE;

    this.flashcardService.verify(this.wordModel.localeId, this.wordModel.word).then(function(responses: Array<string>) {
      let correct : boolean = false;
      for (let i = 0; i < responses.length; i++) {
        if (this.wordModel.word == responses[i]) {
          this.verificationStatus = VerificationStatus.CORRECT;
          break;
        }       
        
        if (!correct) {
          this.verificationStatus = VerificationStatus.INCORRECT;      
        }
        this.micIcon.color = "black";
      }
    });   
  }

  flip()
  {
      this.flipEvent.next('');
  }

  isCorrectHidden() : boolean { return this.verificationStatus != VerificationStatus.CORRECT; }
  isIncorrectHidden() : boolean { return this.verificationStatus != VerificationStatus.INCORRECT; }
}
