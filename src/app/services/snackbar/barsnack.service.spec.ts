import { TestBed } from '@angular/core/testing';

import { BarsnackService } from './barsnack.service';

describe('BarsnackService', () => {
  let service: BarsnackService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BarsnackService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
