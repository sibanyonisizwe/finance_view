import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeMonthlyContributionEventComponent } from './change-monthly-contribution-event.component';

describe('ChangeMonthlyContributionEventComponent', () => {
  let component: ChangeMonthlyContributionEventComponent;
  let fixture: ComponentFixture<ChangeMonthlyContributionEventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangeMonthlyContributionEventComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChangeMonthlyContributionEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
