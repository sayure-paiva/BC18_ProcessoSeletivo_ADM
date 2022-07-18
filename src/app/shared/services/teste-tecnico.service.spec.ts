import { TestBed } from '@angular/core/testing';

import { TesteTecnicoService } from './teste-tecnico.service';

describe('TesteTecnicoService', () => {
  let service: TesteTecnicoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TesteTecnicoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
