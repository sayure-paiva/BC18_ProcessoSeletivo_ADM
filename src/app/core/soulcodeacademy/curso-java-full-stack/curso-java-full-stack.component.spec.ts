import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CursoJavaFullStackComponent } from './curso-java-full-stack.component';

describe('CursoJavaFullStackComponent', () => {
  let component: CursoJavaFullStackComponent;
  let fixture: ComponentFixture<CursoJavaFullStackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CursoJavaFullStackComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CursoJavaFullStackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
