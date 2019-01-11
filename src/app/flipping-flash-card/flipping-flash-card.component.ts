import { Component, OnInit, Input } from '@angular/core';
import { WordModel } from '../models/wordmodel';
import { EntryModel } from '../models/entrymodel';
import { DICTIONARY } from '../data/dictionary';

@Component({
  selector: 'app-flipping-flash-card',
  templateUrl: './flipping-flash-card.component.html',
  styleUrls: ['./flipping-flash-card.component.scss']
})
export class FlippingFlashCardComponent implements OnInit {

  flipped: boolean = false;
  
  @Input()
  entry : EntryModel;

  
  firstWordModel : WordModel;
  secondWordModel : WordModel;

  flip()
  {
    this.flipped = !this.flipped;
  }

  constructor() { }

  ngOnInit() {
    this.entry = DICTIONARY[0];
    
    this.firstWordModel = this.entry.wordModels[0];
    this.secondWordModel = this.entry.wordModels[1];
    
  }



}
