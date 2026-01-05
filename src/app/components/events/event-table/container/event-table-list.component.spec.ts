import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventTableListComponent } from './event-table-list.component';

describe('EventTableListComponent', () => {
  let component: EventTableListComponent;
  let fixture: ComponentFixture<EventTableListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventTableListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventTableListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
