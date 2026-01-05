import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeInterestEventComponent } from './change-interest-event.component';

describe('ChangeInterestEventComponent', () => {
  let component: ChangeInterestEventComponent;
  let fixture: ComponentFixture<ChangeInterestEventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangeInterestEventComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChangeInterestEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
