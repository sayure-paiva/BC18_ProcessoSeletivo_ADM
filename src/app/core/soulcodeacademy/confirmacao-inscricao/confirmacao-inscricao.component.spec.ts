import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmacaoInscricaoComponent } from './confirmacao-inscricao.component';

describe('ConfirmacaoInscricaoComponent', () => {
  let component: ConfirmacaoInscricaoComponent;
  let fixture: ComponentFixture<ConfirmacaoInscricaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmacaoInscricaoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmacaoInscricaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
