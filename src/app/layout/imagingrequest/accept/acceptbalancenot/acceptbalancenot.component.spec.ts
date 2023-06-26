import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcceptbalancenotComponent } from './acceptbalancenot.component';

describe('AcceptbalancenotComponent', () => {
  let component: AcceptbalancenotComponent;
  let fixture: ComponentFixture<AcceptbalancenotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AcceptbalancenotComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AcceptbalancenotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
