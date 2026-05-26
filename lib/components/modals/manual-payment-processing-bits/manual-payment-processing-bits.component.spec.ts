import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManualPaymentProcessingBitsComponent } from './manual-payment-processing-bits.component';

describe('ManualPaymentProcessingBitsComponent', () => {
  let component: ManualPaymentProcessingBitsComponent;
  let fixture: ComponentFixture<ManualPaymentProcessingBitsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManualPaymentProcessingBitsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManualPaymentProcessingBitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
