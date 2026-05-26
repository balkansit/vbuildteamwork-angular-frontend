import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DynamicFormWrapperDialogComponent } from '@lib/layouts/wrappers/dynamic-form-wrapper-dialog/dynamic-form-wrapper-dialog.component';
import { ApiResponse } from '@lib/models/ApiResponse.model';
import { withLoadingAndAlert } from '@lib/utils/withLoadingAndAlert';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AddEditModalService {
  constructor(private dialog: MatDialog) {}
  editItem<T>(
    resourceName: string,
    item: T,
    getEditFormFields: (item: T) => any[],
    updateItem: (id: number, data: any) => Observable<any>,
    refresh: () => void,
    spinner: any,
    setAlert: (a: any) => void,
    useModalAlert: boolean
  ) {
    const fields = getEditFormFields(item);

    const dialogRef = this.dialog.open(DynamicFormWrapperDialogComponent, {
      data: { title: `Edit ${resourceName}`, fields },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result?.success) {
        updateItem((item as any).id, result.data)
          .pipe(
            withLoadingAndAlert(spinner, setAlert, {
              useModal: useModalAlert,
              showSuccess: true,
              loadingMessage: `Updating ${resourceName}`,
              successMessage: `${resourceName} updated!`,
              errorMessage: `Failed to update ${resourceName}`,
            })
          )
          .subscribe(() => refresh());
      }
    });
  }

  addItem<T>(
    resourceName: string,
    getAddFormFields: () => any[],
    createItem: (data: any) => Observable<any>,
    refresh: () => void,
    spinner: any,
    setAlert: (a: any) => void,
    useModalAlert: boolean,
    rawValueOnSubmit: boolean = false,
    formFields: any[] = []
  ) {
    let fields = getAddFormFields();
    if (formFields.length > 0) {
      fields = formFields;
    }

    const dialogRef = this.dialog.open(DynamicFormWrapperDialogComponent, {
      data: { title: `Add ${resourceName}`, fields, rawValueOnSubmit },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result?.success) {
        createItem(result.data)
          .pipe(
            withLoadingAndAlert(spinner, setAlert, {
              useModal: useModalAlert,
              showSuccess: true,
              loadingMessage: `Creating ${resourceName}`,
              successMessage: `${resourceName} created!`,
              errorMessage: `Failed to create ${resourceName}`,
            })
          )
          .subscribe(() => refresh());
      }
    });
  }
}
