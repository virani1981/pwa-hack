import { Component, OnInit, ViewChild, Renderer2 } from '@angular/core';
import { EntryModel } from "../models/entrymodel";
import { FlashcardService } from "../services/flashcards/flashcard.service";
import { IonInput } from '@ionic/angular';

@Component({
  selector: 'app-deck',
  templateUrl: './deck.component.html',
  styleUrls: ['./deck.component.scss']
})
export class DeckComponent implements OnInit {
  private localeId: string = "en-us";
  private addedWord: string;
  private entries: EntryModel[];
  private iconType: string = "add";
  public show: boolean = false;
  @ViewChild('myInput')
  private myInput: IonInput;
  constructor(private flashcardService: FlashcardService, private renderer: Renderer2) { 
    this.flashcardService.getCurrentCards().then((entries) => { this.entries = entries});
  }

  ngOnInit() {
  }

  removeEntry(entry: EntryModel){
    this.flashcardService.removeCard(entry);
  }

  addEntry(word: string){
    if(word.length > 0)
      this.flashcardService.addCard(this.localeId, word);
    this.toggle();
  }

  playEntry(entry){
    console.log(entry);
  }

  setLocaleId(val: string){
    this.localeId = val;
  }

  toggle() {
    this.show = !this.show;
    if(this.show){
      this.iconType = 'remove';
      this.myInput.setFocus();
    }else
      this.iconType = 'add';
    this.addedWord = "";
  }

}
