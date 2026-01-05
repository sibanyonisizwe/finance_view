import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertySummeryComponent } from './property-summery.component';

describe('PropertySummeryComponent', () => {
  let component: PropertySummeryComponent;
  let fixture: ComponentFixture<PropertySummeryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PropertySummeryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PropertySummeryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
