/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { DetailMiniCourseComponent } from './detail-mini-course.component';

describe('DetailMiniCourseComponent', () => {
  let component: DetailMiniCourseComponent;
  let fixture: ComponentFixture<DetailMiniCourseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailMiniCourseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailMiniCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
