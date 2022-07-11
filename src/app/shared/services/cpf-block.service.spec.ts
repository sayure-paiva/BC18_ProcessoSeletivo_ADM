import { TestBed } from '@angular/core/testing';

import { CpfBlockService } from './cpf-block.service';

describe('CpfBlockService', () => {
  let service: CpfBlockService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CpfBlockService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
