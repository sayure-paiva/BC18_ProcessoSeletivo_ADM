import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TesteTecnicoEditComponent } from './teste-tecnico-edit.component';

describe('TesteTecnicoEditComponent', () => {
  let component: TesteTecnicoEditComponent;
  let fixture: ComponentFixture<TesteTecnicoEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TesteTecnicoEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TesteTecnicoEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
