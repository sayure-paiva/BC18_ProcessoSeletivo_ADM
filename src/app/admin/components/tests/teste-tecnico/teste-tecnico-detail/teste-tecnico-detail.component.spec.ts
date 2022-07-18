import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TesteTecnicoDetailComponent } from './teste-tecnico-detail.component';

describe('TesteTecnicoDetailComponent', () => {
  let component: TesteTecnicoDetailComponent;
  let fixture: ComponentFixture<TesteTecnicoDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TesteTecnicoDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TesteTecnicoDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
