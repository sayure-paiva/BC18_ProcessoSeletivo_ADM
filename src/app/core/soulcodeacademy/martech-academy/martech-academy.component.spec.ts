import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MartechAcademyComponent } from './martech-academy.component';

describe('MartechAcademyComponent', () => {
  let component: MartechAcademyComponent;
  let fixture: ComponentFixture<MartechAcademyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MartechAcademyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MartechAcademyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
