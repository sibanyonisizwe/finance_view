import {ComponentFixture, TestBed} from '@angular/core/testing';

import {TaxpayerMoreDetailsComponent} from './taxpayer-more-details.component';

describe('TaxpayerMoreDetailsComponent', () => {
  let component: TaxpayerMoreDetailsComponent;
  let fixture: ComponentFixture<TaxpayerMoreDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TaxpayerMoreDetailsComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(TaxpayerMoreDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
