import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WithdrawalEventComponent } from './withdrawal-event.component';

describe('WithdrawalEventComponent', () => {
  let component: WithdrawalEventComponent;
  let fixture: ComponentFixture<WithdrawalEventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WithdrawalEventComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WithdrawalEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
