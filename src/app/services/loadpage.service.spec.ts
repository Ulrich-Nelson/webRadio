import { TestBed } from '@angular/core/testing';

import { LoadpageService } from './loadpage.service';

describe('LoadpageService', () => {
  let service: LoadpageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoadpageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
