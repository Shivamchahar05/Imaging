import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistervalidateComponent } from './registervalidate.component';

describe('RegistervalidateComponent', () => {
  let component: RegistervalidateComponent;
  let fixture: ComponentFixture<RegistervalidateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistervalidateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistervalidateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
