import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddresspopComponent } from './addresspop.component';

describe('AddresspopComponent', () => {
  let component: AddresspopComponent;
  let fixture: ComponentFixture<AddresspopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddresspopComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddresspopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
