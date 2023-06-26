import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistervalidationComponent } from './registervalidation.component';

describe('RegistervalidationComponent', () => {
  let component: RegistervalidationComponent;
  let fixture: ComponentFixture<RegistervalidationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistervalidationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistervalidationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
