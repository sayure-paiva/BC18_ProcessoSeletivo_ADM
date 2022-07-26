/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { EditMiniCourseComponent } from './edit-mini-course.component';

describe('EditMiniCourseComponent', () => {
  let component: EditMiniCourseComponent;
  let fixture: ComponentFixture<EditMiniCourseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditMiniCourseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditMiniCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
