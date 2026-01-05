import { TestBed } from '@angular/core/testing';

import { ForecastContextService } from './forecast-context.service';

describe('ForecastContextService', () => {
  let service: ForecastContextService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ForecastContextService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
