import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CursoEngenhariaDeDadosComponent } from './curso-engenharia-de-dados.component';

describe('CursoEngenhariaDeDadosComponent', () => {
  let component: CursoEngenhariaDeDadosComponent;
  let fixture: ComponentFixture<CursoEngenhariaDeDadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CursoEngenhariaDeDadosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CursoEngenhariaDeDadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
