import {ComponentFixture, TestBed} from '@angular/core/testing';

import {TaxIndexComponent} from './tax-index.component';

describe('TaxIndexComponent', () => {
  let component: TaxIndexComponent;
  let fixture: ComponentFixture<TaxIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TaxIndexComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(TaxIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
