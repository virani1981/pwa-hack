import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { WordModel } from '../models/wordmodel';
import { EntryModel } from '../models/entrymodel';
import { DICTIONARY } from '../data/dictionary';
import { ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-flipping-flash-card',
  templateUrl: './flipping-flash-card.component.html',
  styleUrls: ['./flipping-flash-card.component.scss']
})
export class FlippingFlashCardComponent implements OnInit {
  ngOnInit(): void {
    this.flipped = false;  
  }
  
  flipped: boolean = false;
  
  @Input()
  entry : EntryModel;

    
  flip()
  {
    let card = document.querySelector(".mcard");
    card.classList.toggle("is-flipped");
  }

  resetFlip()
  {
    let card = document.querySelector(".mcard");
    if(card.classList.contains("is-flipped")) {
      card.classList.remove("is-flipped");
    }
    this.flipped = false;
  }


  // constructor(navParams: NavParams) {
  //   // componentProps can also be accessed at construction time using NavParams
  // }  



}
