import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerForecastListContainerComponent } from './customer-forecast-list-container.component';

describe('CustomerForecastListContainerComponent', () => {
  let component: CustomerForecastListContainerComponent;
  let fixture: ComponentFixture<CustomerForecastListContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerForecastListContainerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerForecastListContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
