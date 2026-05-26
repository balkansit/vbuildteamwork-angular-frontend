import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PieChartOneComponent } from './pie-chart-one.component';

describe('PieChartOneComponent', () => {
  let component: PieChartOneComponent;
  let fixture: ComponentFixture<PieChartOneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PieChartOneComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PieChartOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
