import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InitiatepaymentComponent } from './initiatepayment.component';

describe('InitiatepaymentComponent', () => {
  let component: InitiatepaymentComponent;
  let fixture: ComponentFixture<InitiatepaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InitiatepaymentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InitiatepaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
