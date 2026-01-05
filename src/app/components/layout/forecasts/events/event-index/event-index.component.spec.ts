import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventIndexComponent } from './event-index.component';

describe('EventIndexComponent', () => {
  let component: EventIndexComponent;
  let fixture: ComponentFixture<EventIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventIndexComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
