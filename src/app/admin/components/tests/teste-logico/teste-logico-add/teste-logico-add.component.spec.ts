import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TesteLogicoAddComponent } from './teste-logico-add.component';

describe('TesteLogicoAddComponent', () => {
  let component: TesteLogicoAddComponent;
  let fixture: ComponentFixture<TesteLogicoAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TesteLogicoAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TesteLogicoAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
