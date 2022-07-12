import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TesteLogicoEditComponent } from './teste-logico-edit.component';

describe('TesteLogicoEditComponent', () => {
  let component: TesteLogicoEditComponent;
  let fixture: ComponentFixture<TesteLogicoEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TesteLogicoEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TesteLogicoEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
