import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CustomerForecastListComponent} from './customer-forecast-list.component';

describe('CustomerForecastListComponent', () => {
  let component: CustomerForecastListComponent;
  let fixture: ComponentFixture<CustomerForecastListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CustomerForecastListComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(CustomerForecastListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
