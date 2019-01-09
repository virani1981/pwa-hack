import { TestBed } from '@angular/core/testing';

import { FlashcardService } from './flashcard.service';

describe('FlashcardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FlashcardService = TestBed.get(FlashcardService);
    expect(service).toBeTruthy();
  });
});
