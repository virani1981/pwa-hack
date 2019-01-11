import { Component, OnInit, Input, ViewChild, ElementRef, Output, EventEmitter, AfterViewInit } from '@angular/core';
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
  entry : EntryModel;

  @Output() 
  flipEvent = new EventEmitter<string>();

  @ViewChild('micIcon') micIcon: IonIcon;

  wordModelIndex: number = 0;
  
  verificationStatus: VerificationStatus = VerificationStatus.NONE;

  @Input()
  hideButtons: boolean = false;

  sayWord()
  {

    this.flashcardService.say(this.entry.wordModels[0].localeId, this.entry.wordModels[0].word);
  }

  saySentence()
  {
  
    this.flashcardService.say(this.entry.wordModels[0].localeId, this.entry.wordModels[0].sentence);
    
  }

  verify()
  {    
    this.micIcon.color = "red";
    this.verificationStatus = VerificationStatus.NONE;

    this.flashcardService.verify(this.entry.wordModels[0].localeId,  this.entry.wordModels[0].sentence).then(function(responses: Array<string>) {
      let correct : boolean = false;
      for (let i = 0; i < responses.length; i++) {
        if (this.entry.wordModels[0].word == responses[i]) {
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
