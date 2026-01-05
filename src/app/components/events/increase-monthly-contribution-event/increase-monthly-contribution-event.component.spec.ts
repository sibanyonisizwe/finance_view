import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncreaseMonthlyContributionEventComponent } from './increase-monthly-contribution-event.component';

describe('IncreaseMonthlyContributionEvenrComponent', () => {
  let component: IncreaseMonthlyContributionEventComponent;
  let fixture: ComponentFixture<IncreaseMonthlyContributionEventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IncreaseMonthlyContributionEventComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IncreaseMonthlyContributionEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
