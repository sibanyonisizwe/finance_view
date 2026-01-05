import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForecastRowListContainerComponent } from './forecast-row-list-container.component';

describe('ForecastRowListComponent', () => {
  let component: ForecastRowListContainerComponent;
  let fixture: ComponentFixture<ForecastRowListContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForecastRowListContainerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ForecastRowListContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
