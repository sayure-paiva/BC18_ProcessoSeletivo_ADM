import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailProcessComponent } from './detail-process.component';

describe('DetailProcessComponent', () => {
  let component: DetailProcessComponent;
  let fixture: ComponentFixture<DetailProcessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailProcessComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailProcessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
