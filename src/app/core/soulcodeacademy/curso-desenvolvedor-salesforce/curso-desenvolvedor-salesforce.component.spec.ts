import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CursoDesenvolvedorSalesforceComponent } from './curso-desenvolvedor-salesforce.component';

describe('CursoDesenvolvedorSalesforceComponent', () => {
  let component: CursoDesenvolvedorSalesforceComponent;
  let fixture: ComponentFixture<CursoDesenvolvedorSalesforceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CursoDesenvolvedorSalesforceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CursoDesenvolvedorSalesforceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
