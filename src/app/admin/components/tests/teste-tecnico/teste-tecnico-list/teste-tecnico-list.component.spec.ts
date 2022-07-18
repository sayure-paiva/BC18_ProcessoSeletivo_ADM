import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TesteTecnicoListComponent } from './teste-tecnico-list.component';

describe('TesteTecnicoListComponent', () => {
  let component: TesteTecnicoListComponent;
  let fixture: ComponentFixture<TesteTecnicoListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TesteTecnicoListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TesteTecnicoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
