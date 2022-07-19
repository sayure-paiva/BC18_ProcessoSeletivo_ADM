import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailCandidateComponent } from './detail-candidate.component';

describe('DetailCandidateComponent', () => {
  let component: DetailCandidateComponent;
  let fixture: ComponentFixture<DetailCandidateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailCandidateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailCandidateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
