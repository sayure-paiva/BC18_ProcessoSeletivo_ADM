import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCpfBlockComponent } from './list-cpf-block.component';

describe('ListCpfBlockComponent', () => {
  let component: ListCpfBlockComponent;
  let fixture: ComponentFixture<ListCpfBlockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListCpfBlockComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListCpfBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
