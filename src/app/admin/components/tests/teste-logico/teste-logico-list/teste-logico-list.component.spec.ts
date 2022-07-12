import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TesteLogicoListComponent } from './teste-logico-list.component';

describe('TesteLogicoListComponent', () => {
  let component: TesteLogicoListComponent;
  let fixture: ComponentFixture<TesteLogicoListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TesteLogicoListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TesteLogicoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
