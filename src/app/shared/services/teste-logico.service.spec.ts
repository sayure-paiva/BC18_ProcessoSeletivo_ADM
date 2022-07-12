import { TestBed } from '@angular/core/testing';

import { TesteLogicoService } from './teste-logico.service';

describe('TesteLogicoService', () => {
  let service: TesteLogicoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TesteLogicoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
