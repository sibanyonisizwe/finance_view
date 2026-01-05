import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForecastMoreDetailsComponent } from './forecast-more-details.component';

describe('ForecastMoreDetailsComponent', () => {
  let component: ForecastMoreDetailsComponent;
  let fixture: ComponentFixture<ForecastMoreDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForecastMoreDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ForecastMoreDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
