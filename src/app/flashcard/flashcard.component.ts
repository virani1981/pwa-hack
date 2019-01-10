import { Component, OnInit, Input, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { EntryModel } from "../models/entrymodel";
import { FlashcardService} from "../services/flashcards/flashcard.service";
import { WordModel } from '../models/wordmodel';

export enum VerificationStatus { NONE, CORRECT, INCORRECT }

@Component({
  selector: 'app-flashcard',
  templateUrl: 'flashcard.component.html',
  styleUrls: ['flashcard.component.scss']
})
export class FlashcardComponent implements OnInit {
  constructor(private flashcardService: FlashcardService) { }

  ngOnInit() {
    
  }


  @Input()
  wordModel : WordModel;

  @Output() 
  flipEvent = new EventEmitter<string>();

  @ViewChild('micIcon') micIcon: ElementRef;

  wordModelIndex: number = 0;
  
  verificationStatus: VerificationStatus = VerificationStatus.NONE;


  sayWord(word : string)
  {
        this.flashcardService.say(this.wordModel.localeId, this.wordModel.word);
  }  

  verify()
  {    
    this.micIcon.nativeElement.color = "red";
    this.verificationStatus = VerificationStatus.NONE;

    this.flashcardService.verify(this.wordModel.localeId, this.wordModel.word);    // currently void
    let isCorrect: boolean = /*this.flashcardService.verify(secondLocaleId, entry.wordModels[wordModelIndex].word);*/true;
    this.verificationStatus = isCorrect ? VerificationStatus.CORRECT : VerificationStatus.INCORRECT;
    this.micIcon.nativeElement.color = "black";
  }

  flip()
  {
      this.flipEvent.next('');
  }

  isCorrectHidden() : boolean { return this.verificationStatus != VerificationStatus.CORRECT; }
  isIncorrectHidden() : boolean { return this.verificationStatus != VerificationStatus.INCORRECT; }
}
