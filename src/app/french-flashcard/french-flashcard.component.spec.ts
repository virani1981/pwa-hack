import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FrenchFlashcardComponent } from './french-flashcard.component';

describe('FrenchFlashcardComponent', () => {
  let component: FrenchFlashcardComponent;
  let fixture: ComponentFixture<FrenchFlashcardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FrenchFlashcardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FrenchFlashcardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
