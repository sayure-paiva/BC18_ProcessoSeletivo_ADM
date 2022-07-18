import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TesteTecnicoDeleteComponent } from './teste-tecnico-delete.component';

describe('TesteTecnicoDeleteComponent', () => {
  let component: TesteTecnicoDeleteComponent;
  let fixture: ComponentFixture<TesteTecnicoDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TesteTecnicoDeleteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TesteTecnicoDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
