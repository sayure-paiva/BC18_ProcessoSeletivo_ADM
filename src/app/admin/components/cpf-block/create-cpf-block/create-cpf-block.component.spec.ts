import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCpfBlockComponent } from './create-cpf-block.component';

describe('CreateCpfBlockComponent', () => {
  let component: CreateCpfBlockComponent;
  let fixture: ComponentFixture<CreateCpfBlockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateCpfBlockComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateCpfBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
