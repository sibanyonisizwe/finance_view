import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForecastRowListComponent } from './forecast-row-list.component';

describe('ForecastRowListComponent', () => {
  let component: ForecastRowListComponent;
  let fixture: ComponentFixture<ForecastRowListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForecastRowListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ForecastRowListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
