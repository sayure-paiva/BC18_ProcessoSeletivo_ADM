import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteCpfBlockComponent } from './delete-cpf-block.component';

describe('DeleteCpfBlockComponent', () => {
  let component: DeleteCpfBlockComponent;
  let fixture: ComponentFixture<DeleteCpfBlockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteCpfBlockComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteCpfBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
