import { TestBed } from '@angular/core/testing';

import { EventContextService } from './event-context.service';

describe('EventContextService', () => {
  let service: EventContextService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EventContextService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
