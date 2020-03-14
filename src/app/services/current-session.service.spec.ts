import { TestBed } from '@angular/core/testing';

import { CurrentSessionService } from './current-session.service';

describe('CurrentSessionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CurrentSessionService = TestBed.get(CurrentSessionService);
    expect(service).toBeTruthy();
  });
});
