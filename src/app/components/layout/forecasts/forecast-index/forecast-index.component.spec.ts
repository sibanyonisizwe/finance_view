import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ForecastIndexComponent} from './forecast-index.component';

describe('ForecastIndexComponent', () => {
  let component: ForecastIndexComponent;
  let fixture: ComponentFixture<ForecastIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ForecastIndexComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ForecastIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
