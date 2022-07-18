/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { TipoBootcampService } from './tipo-bootcamp.service';

describe('Service: TipoBootcamp', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TipoBootcampService]
    });
  });

  it('should ...', inject([TipoBootcampService], (service: TipoBootcampService) => {
    expect(service).toBeTruthy();
  }));
});
