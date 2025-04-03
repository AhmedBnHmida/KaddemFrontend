import { TestBed } from '@angular/core/testing';

import { ApiprojService } from './apiproj.service';

describe('ApiprojService', () => {
  let service: ApiprojService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiprojService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
