import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';

@Component({
  selector: 'app-pos-form',
  standalone: false,
  templateUrl: './pos-form.component.html',
  styleUrls: ['./pos-form.component.css'],
})
export class PosFormComponent implements OnInit {
  @Input() fields: any[] = []; // top form
  @Input() itemFields: any[] = []; // table items

  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      meta: this.fb.group({}),
      items: this.fb.array([]),
    });
  }

  ngOnInit(): void {
    const metaGroup = this.form.get('meta') as FormGroup;
    this.fields.forEach((field) => {
      metaGroup.addControl(field.name, this.fb.control(''));
    });
    this.addItem(); // add initial item
  }

  get items() {
    return this.form.get('items') as FormArray;
  }

  addItem() {
    const group = this.fb.group({});
    this.itemFields.forEach((field) => {
      group.addControl(field.name, this.fb.control(''));
    });
    this.items.push(group);
  }

  removeItem(index: number) {
    this.items.removeAt(index);
  }

  submit() {
    console.log(this.form.value);
  }
}
