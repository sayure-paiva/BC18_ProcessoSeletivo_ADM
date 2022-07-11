import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateCpfBlockComponent } from './update-cpf-block.component';

describe('UpdateCpfBlockComponent', () => {
  let component: UpdateCpfBlockComponent;
  let fixture: ComponentFixture<UpdateCpfBlockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateCpfBlockComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateCpfBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
