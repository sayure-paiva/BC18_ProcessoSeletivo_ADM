/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CreateMiniCourseComponent } from './create-mini-course.component';

describe('CreateMiniCourseComponent', () => {
  let component: CreateMiniCourseComponent;
  let fixture: ComponentFixture<CreateMiniCourseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateMiniCourseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateMiniCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
