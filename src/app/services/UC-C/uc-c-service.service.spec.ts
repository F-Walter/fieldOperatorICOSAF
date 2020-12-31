import { TestBed } from '@angular/core/testing';

import { UCCService } from './uc-c-service.service';

describe('UCCServiceService', () => {
  let service: UCCService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UCCService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
