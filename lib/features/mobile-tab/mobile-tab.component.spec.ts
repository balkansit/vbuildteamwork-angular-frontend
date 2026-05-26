import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileTabComponent } from './mobile-tab.component';

describe('MobileTabComponent', () => {
  let component: MobileTabComponent;
  let fixture: ComponentFixture<MobileTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MobileTabComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MobileTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
