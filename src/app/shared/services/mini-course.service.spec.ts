/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { MiniCourseService } from './mini-course.service';

describe('Service: MiniCourse', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MiniCourseService]
    });
  });

  it('should ...', inject([MiniCourseService], (service: MiniCourseService) => {
    expect(service).toBeTruthy();
  }));
});
