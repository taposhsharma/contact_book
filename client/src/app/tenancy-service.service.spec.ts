import { TestBed } from '@angular/core/testing';

import { TenancyServiceService } from './tenancy-service.service';

describe('TenancyServiceService', () => {
  let service: TenancyServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TenancyServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
