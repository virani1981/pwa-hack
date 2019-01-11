import { Component, OnInit, Input, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { EntryModel } from "../models/entrymodel";
import { FlashcardService} from "../services/flashcards/flashcard.service";
import { WordModel } from '../models/wordmodel';
import { IonIcon } from '@ionic/angular';

export enum VerificationStatus { NONE, CORRECT, INCORRECT }

@Component({
  selector: 'app-french-flashcard',
  templateUrl: 'french-flashcard.component.html',
  styleUrls: ['french-flashcard.component.scss']
})
export class FrenchFlashcardComponent {
  constructor(private flashcardService: FlashcardService) { }

  @Input()
  entry : EntryModel;

  @Input()
  hideButtons: boolean = true;
  @Output() 
  flipEvent = new EventEmitter<string>();

  @ViewChild('micIcon') micIcon: IonIcon;

  
  wordModelIndex: number = 1;
  
  verificationStatus: VerificationStatus = VerificationStatus.NONE;


  // sayWord(word : string)
  // {
  //     this.flashcardService.say(this.wordModel.localeId, word);
  // }  

  sayFrenchWord()
  {
    this.flashcardService.say(this.entry.wordModels[1].localeId, this.entry.wordModels[1].word);
  }

  sayFrenchSentence()
  { 
    this.flashcardService.say(this.entry.wordModels[1].localeId, this.entry.wordModels[1].sentence);
    
  }

  verify()
  {    
    this.micIcon.color = "red";
    this.verificationStatus = VerificationStatus.NONE;

    this.flashcardService.verify(this.entry.wordModels[1].localeId,  this.entry.wordModels[1].sentence).then(function(responses: Array<string>) {
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
