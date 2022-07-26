import { TestBed } from '@angular/core/testing';

import { IsRecruiterGuard } from './is-recruiter.guard';

describe('IsRecruiterGuard', () => {
  let guard: IsRecruiterGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(IsRecruiterGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
