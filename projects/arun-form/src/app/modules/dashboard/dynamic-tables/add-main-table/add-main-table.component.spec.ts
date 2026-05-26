import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMainTableComponent } from './add-main-table.component';

describe('AddMainTableComponent', () => {
  let component: AddMainTableComponent;
  let fixture: ComponentFixture<AddMainTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddMainTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddMainTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
