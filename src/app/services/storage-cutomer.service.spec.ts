import { TestBed } from '@angular/core/testing';

import { StorageCutomerService } from './storage-cutomer.service';

describe('StorageCutomerService', () => {
  let service: StorageCutomerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StorageCutomerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
