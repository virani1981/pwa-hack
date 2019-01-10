import { Component, OnInit } from '@angular/core';
import { EntryModel } from "../models/entrymodel";
import { FlashcardService } from "../services/flashcards/flashcard.service";

@Component({
  selector: 'app-deck',
  templateUrl: './deck.component.html',
  styleUrls: ['./deck.component.scss']
})
export class DeckComponent implements OnInit {
  private localeId: string = "en-us";
  private addedWord: string;
  private entries: EntryModel[];;
  public show: boolean = false;
  constructor(private flashcardService: FlashcardService) { 
    this.flashcardService.getCurrentCards().then((entries) => { this.entries = entries});
  }

  ngOnInit() {
  }

  removeEntry(entry: EntryModel){
    this.flashcardService.removeCard(entry);
  }

  addEntry(word: string){
    console.log(word);
    this.flashcardService.addCard(this.localeId, word);
    this.addedWord = "";
    this.toggle();
  }

  setLocaleId(val: string){
    this.localeId = val;
  }

  toggle() {
    this.show = !this.show;
  }

}
