import { CommonPieComponent } from './common-pie.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';


describe('CommonPieComponent', () => {
  let component: CommonPieComponent;
  let fixture: ComponentFixture<CommonPieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommonPieComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommonPieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
