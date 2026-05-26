import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRolePremissionComponent } from './add-role-premission.component';

describe('AddRolePremissionComponent', () => {
  let component: AddRolePremissionComponent;
  let fixture: ComponentFixture<AddRolePremissionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddRolePremissionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddRolePremissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
