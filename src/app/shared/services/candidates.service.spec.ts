/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CandidatesService } from './candidates.service';

describe('Service: Candidates', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CandidatesService]
    });
  });

  it('should ...', inject([CandidatesService], (service: CandidatesService) => {
    expect(service).toBeTruthy();
  }));
});
