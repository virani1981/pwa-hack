import { Component, OnInit } from '@angular/core';
import { EntryModel } from "../models/entrymodel";
import { FlashcardService } from "../services/flashcards/flashcard.service";

@Component({
  selector: 'app-flashcard',
  templateUrl: 'flashcard.component.html',
  styleUrls: ['flashcard.component.scss']
})
export class FlashcardComponent implements OnInit {
  
  constructor(private flashcardService: FlashcardService) {
    //this.entry = this.flashcardService.getEntry();
   }

  private entry: EntryModel
 
  ngOnInit(){
  }
}
