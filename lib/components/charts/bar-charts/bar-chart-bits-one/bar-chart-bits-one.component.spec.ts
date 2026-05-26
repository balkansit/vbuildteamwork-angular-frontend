import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarChartBitsOneComponent } from './bar-chart-bits-one.component';

describe('BarChartBitsOneComponent', () => {
  let component: BarChartBitsOneComponent;
  let fixture: ComponentFixture<BarChartBitsOneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BarChartBitsOneComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BarChartBitsOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
