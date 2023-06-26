import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupsnackbarComponent } from './signupsnackbar.component';

describe('SignupsnackbarComponent', () => {
  let component: SignupsnackbarComponent;
  let fixture: ComponentFixture<SignupsnackbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignupsnackbarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupsnackbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
