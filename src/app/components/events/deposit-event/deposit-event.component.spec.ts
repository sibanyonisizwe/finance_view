import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepositEventComponent } from './deposit-event.component';

describe('DepositEventComponent', () => {
  let component: DepositEventComponent;
  let fixture: ComponentFixture<DepositEventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DepositEventComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DepositEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
