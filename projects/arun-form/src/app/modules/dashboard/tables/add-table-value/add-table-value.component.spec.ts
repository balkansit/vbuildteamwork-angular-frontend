import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTableValueComponent } from './add-table-value.component';

describe('AddTableValueComponent', () => {
  let component: AddTableValueComponent;
  let fixture: ComponentFixture<AddTableValueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddTableValueComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddTableValueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
