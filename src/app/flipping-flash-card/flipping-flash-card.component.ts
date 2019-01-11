import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { WordModel } from '../models/wordmodel';
import { EntryModel } from '../models/entrymodel';
import { DICTIONARY } from '../data/dictionary';

@Component({
  selector: 'app-flipping-flash-card',
  templateUrl: './flipping-flash-card.component.html',
  styleUrls: ['./flipping-flash-card.component.scss']
})
export class FlippingFlashCardComponent implements OnInit {
  ngOnInit(): void {
    this.flipped = false;  
  }
  
  flipped: boolean;
  
  @Input()
  entry : EntryModel;


  flip()
  {
    let card = document.querySelector(".card");
    card.classList.toggle("is-flipped");
    this.flipped = !this.flipped;
  }

  resetFlip()
  {
    let card = document.querySelector(".card");
    if(card.classList.contains("is-flipped")) {
      card.classList.remove("is-flipped");
    }
    this.flipped = false;
  }


  constructor() { }




}
