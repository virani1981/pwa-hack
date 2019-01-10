import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlippingFlashCardComponent } from './flipping-flash-card.component';

describe('FlippingFlashCardComponent', () => {
  let component: FlippingFlashCardComponent;
  let fixture: ComponentFixture<FlippingFlashCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlippingFlashCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlippingFlashCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
