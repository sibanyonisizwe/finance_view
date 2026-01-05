import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoreDetailsButtonComponent } from './more-details-button.component';

describe('MoreDetailsButtonComponent', () => {
  let component: MoreDetailsButtonComponent;
  let fixture: ComponentFixture<MoreDetailsButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MoreDetailsButtonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MoreDetailsButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
