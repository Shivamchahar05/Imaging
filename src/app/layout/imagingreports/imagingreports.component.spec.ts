import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImagingreportsComponent } from './imagingreports.component';

describe('ImagingreportsComponent', () => {
  let component: ImagingreportsComponent;
  let fixture: ComponentFixture<ImagingreportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImagingreportsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImagingreportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
