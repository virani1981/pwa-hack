import { Component, OnInit, ViewChild, Renderer2,  ViewChildren, QueryList  } from '@angular/core';
import { EntryModel } from "../models/entrymodel";
import { FlashcardService } from "../services/flashcards/flashcard.service";
import { IonInput, ModalController } from '@ionic/angular';
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
  private addedWord: string;
  private entries: EntryModel[];
  private iconType: string = "add";

  currentEntry: EntryModel | null = null;

  public show: boolean = false;
  public menuUp: boolean = true;

  @ViewChild('myInput')
  private myInput: IonInput;

  constructor(private flashcardService: FlashcardService, private renderer: Renderer2, private modalController : ModalController) { 
    this.flashcardService.getCurrentCards().then((entries) => { this.entries = entries});
  }

  removeEntry(entry: EntryModel){
    this.flashcardService.removeCard(entry);
  }

  addEntry(word: string){
    if(word.length > 0)
      this.flashcardService.addCard(this.localeId, word);
    this.toggle();
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

  playEntry(entry : EntryModel) {
    this.currentEntry = entry;
    this.menuUp = false;
    
    // this.presentModal();
  }


  // async presentModal() {
  //   const modal = await this.modalController.create({
  //     component: FlippingFlashCardComponent,
  //     componentProps: { "entry": this.currentEntry }
  //   });
  //   return await modal.present();
  // }

}
  