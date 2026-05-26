import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BannerWithFilterComponent } from './banner-with-filter.component';

describe('BannerWithFilterComponent', () => {
  let component: BannerWithFilterComponent;
  let fixture: ComponentFixture<BannerWithFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BannerWithFilterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BannerWithFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
