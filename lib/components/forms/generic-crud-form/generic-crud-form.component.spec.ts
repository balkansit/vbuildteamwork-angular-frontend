import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenericCrudFormComponent } from './generic-crud-form.component';

describe('GenericCrudFormComponent', () => {
  let component: GenericCrudFormComponent;
  let fixture: ComponentFixture<GenericCrudFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GenericCrudFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(GenericCrudFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
