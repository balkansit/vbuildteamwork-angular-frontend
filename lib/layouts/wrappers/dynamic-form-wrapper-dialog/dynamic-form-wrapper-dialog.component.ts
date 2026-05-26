import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormField } from '@lib/models/FormField.model';

@Component({
  selector: 'app-dynamic-form-wrapper-dialog',
  standalone: false,
  templateUrl: './dynamic-form-wrapper-dialog.component.html',
  styleUrls: ['./dynamic-form-wrapper-dialog.component.css'],
})
export class DynamicFormWrapperDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<DynamicFormWrapperDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      title: string;
      fields: FormField[];
      buttonLabel?: string;
      cancelLabel?: string;
    }
  ) {}

  ngOnInit() {
    console.log(
      'DynamicFormWrapperDialogComponent initialized with data:',
      this.data
    );
  }

  onSubmit(formData: any) {
    this.dialogRef.close({ success: true, data: formData });
  }

  onCancel() {
    this.dialogRef.close({ success: false });
  }
}

/*

openFormDialog() {
  const fields: FormField[] = [
    {
      name: 'name',
      label: 'Supplier Name',
      type: 'text',
      required: true,
      placeholder: 'Enter supplier name',
    },
    {
      name: 'email',
      label: 'Email',
      type: 'text',
      placeholder: 'Enter email',
    },
  ];

  const dialogRef = this.dialog.open(DynamicFormWrapperDialogComponent, {
    width: '500px',
    data: {
      title: 'Add Supplier',
      fields,
      buttonLabel: 'Save',
      cancelLabel: 'Cancel',
    },
  });

  dialogRef.afterClosed().subscribe((result) => {
    if (result?.success) {
      console.log('Form submitted with:', result.data);
    } else {
      console.log('Dialog was cancelled.');
    }
  });
*/
