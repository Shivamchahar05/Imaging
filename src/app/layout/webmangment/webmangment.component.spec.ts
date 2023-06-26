import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebmangmentComponent } from './webmangment.component';

describe('WebmangmentComponent', () => {
  let component: WebmangmentComponent;
  let fixture: ComponentFixture<WebmangmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebmangmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebmangmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
