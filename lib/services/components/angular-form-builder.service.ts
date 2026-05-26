import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormField } from '@lib/models/FormField.model';

@Injectable({
  providedIn: 'root',
})
export class AngularFormBuilderService {
  constructor(private fb: FormBuilder) {}

  buildForm(schema: FormField[]): FormGroup {
    const group: any = {};

    schema.forEach((field) => {
      group[field.name] = [field.value ?? '', field.validators ?? []];
    });

    return this.fb.group(group);
  }
}
