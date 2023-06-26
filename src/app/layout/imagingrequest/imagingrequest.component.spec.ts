import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImagingrequestComponent } from './imagingrequest.component';

describe('ImagingrequestComponent', () => {
  let component: ImagingrequestComponent;
  let fixture: ComponentFixture<ImagingrequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImagingrequestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImagingrequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
