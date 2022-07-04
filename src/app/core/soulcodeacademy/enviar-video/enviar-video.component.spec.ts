import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnviarVideoComponent } from './enviar-video.component';

describe('EnviarVideoComponent', () => {
  let component: EnviarVideoComponent;
  let fixture: ComponentFixture<EnviarVideoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnviarVideoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnviarVideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
