import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListProcessesComponent } from './list-processes.component';

describe('ListProcessesComponent', () => {
  let component: ListProcessesComponent;
  let fixture: ComponentFixture<ListProcessesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListProcessesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListProcessesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
