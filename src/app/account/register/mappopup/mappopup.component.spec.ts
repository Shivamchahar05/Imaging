import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MappopupComponent } from './mappopup.component';

describe('MappopupComponent', () => {
  let component: MappopupComponent;
  let fixture: ComponentFixture<MappopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MappopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MappopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
