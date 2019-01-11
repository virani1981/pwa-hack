import { Component, OnInit, ViewChild, AfterViewInit, ElementRef, ViewChildren, QueryList } from '@angular/core';
import { EntryModel } from "../models/entrymodel";
import { FlashcardService } from "../services/flashcards/flashcard.service";
import { FlippingFlashCardComponent } from '../flipping-flash-card/flipping-flash-card.component';

@Component({
  selector: 'app-deck',
  templateUrl: './deck.component.html',
  styleUrls: ['./deck.component.scss']
})
export class DeckComponent {
  @ViewChildren(FlippingFlashCardComponent) childrenComponent: QueryList<FlippingFlashCardComponent>;

  flippingFlashCard  : FlippingFlashCardComponent;

  public ngAfterViewInit(): void
  {
    this.childrenComponent.changes.subscribe((comps: QueryList<FlippingFlashCardComponent>) =>
    {
      this.flippingFlashCard = comps.first;
    });
  }
  private localeId: string = "en-us";
  

  addedWord: string;
  
  entries: EntryModel[];

  currentEntry: EntryModel | null = null;

  public show: boolean = false;
  constructor(private flashcardService: FlashcardService) { 
    this.flashcardService.getCurrentCards().then((entries) => { this.entries = entries});
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

  playEntry(entry : EntryModel) {
    if (this.flippingFlashCard) {
      this.flippingFlashCard.resetFlip();
    }
    
    this.currentEntry = entry;
  }

  

}
  