import { TestBed } from '@angular/core/testing';

import { FirstnamesService } from './firstnames.service';

describe('FirstnamesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FirstnamesService = TestBed.get(FirstnamesService);
    expect(service).toBeTruthy();
  });
});
