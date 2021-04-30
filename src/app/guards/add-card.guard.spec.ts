import { TestBed } from '@angular/core/testing';

import { AddCardGuard } from './add-card.guard';

describe('AddCardGuard', () => {
  let guard: AddCardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AddCardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
