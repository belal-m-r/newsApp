import { TestBed } from '@angular/core/testing';

import { ShowToggleService } from './show-toggle.service';

describe('ShowToggleService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ShowToggleService = TestBed.get(ShowToggleService);
    expect(service).toBeTruthy();
  });
});
