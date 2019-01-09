import { Component, OnInit } from '@angular/core';
import { Entry } from "../models/entry";

@Component({
  selector: 'app-flashcard',
  templateUrl: './flashcard.component.html',
  styleUrls: ['./flashcard.component.scss']
})
export class FlashcardComponent implements OnInit {
  
  constructor(private flashcardService: FlashcardService) { }
  private entry: Entry;
  ngOnInit() {
    this.entry = this.flashcardService.getEntry()
  }
}
