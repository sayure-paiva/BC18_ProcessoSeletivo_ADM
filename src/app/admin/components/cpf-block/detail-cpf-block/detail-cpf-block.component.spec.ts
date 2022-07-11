import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailCpfBlockComponent } from './detail-cpf-block.component';

describe('DetailCpfBlockComponent', () => {
  let component: DetailCpfBlockComponent;
  let fixture: ComponentFixture<DetailCpfBlockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailCpfBlockComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailCpfBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
