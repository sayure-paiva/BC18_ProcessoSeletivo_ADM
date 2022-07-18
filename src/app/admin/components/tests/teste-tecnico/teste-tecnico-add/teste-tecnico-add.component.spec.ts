import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TesteTecnicoAddComponent } from './teste-tecnico-add.component';

describe('TesteTecnicoAddComponent', () => {
  let component: TesteTecnicoAddComponent;
  let fixture: ComponentFixture<TesteTecnicoAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TesteTecnicoAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TesteTecnicoAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
