import { TestBed } from '@angular/core/testing';

import { AuthCustomerService } from './auth-customer.service';

describe('AuthCustomerService', () => {
  let service: AuthCustomerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthCustomerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
