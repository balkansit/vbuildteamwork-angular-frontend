import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormField } from '@lib/models/FormField.model';
import { User } from 'projects/matrimony/src/app/models/dbschema/users.model';
import { AddEditModalService } from '@lib/services/components/add-edit-modal.service';
import { SpinnerLoadingService } from '@lib/services/components/spinner-loading.service';
import { AlertData } from '@lib/models/Alert.model';
import { ApiResponse } from '@lib/models/ApiResponse.model';
import { addUserFormFields } from 'projects/arun-form/src/app/models/dbschema/users.model';
import { RoleService } from 'projects/arun-form/src/app/services/apis/role.service';
import { UserService } from 'projects/arun-form/src/app/services/apis/user.service';
import {
  addTableFormFields,
  Table,
} from 'projects/arun-form/src/app/models/dbschema/tables.model';
import { addTableColumnFormFields } from 'projects/arun-form/src/app/models/dbschema/table-columns.model';
import { TableColumnsService } from 'projects/arun-form/src/app/services/apis/table-column.service';
import { TableService } from 'projects/arun-form/src/app/services/apis/table.service';
import { UserModalService } from 'projects/arun-form/src/app/services/modals/user-modal.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  addDropdownValueFormFields,
  DropdownValue,
} from 'projects/arun-form/src/app/models/dbschema/dropdown-values.model';
import { DropdownValuesService } from 'projects/arun-form/src/app/services/apis/dropdown-values.service';
import { TableModalService } from 'projects/arun-form/src/app/services/modals/tables-modal.service';
import { TableColumnModalService } from 'projects/arun-form/src/app/services/modals/table-column-modal.service';
import { AuthService } from '@lib/services/auth/auth.service';

@Component({
  selector: 'app-add-new-table',
  templateUrl: './add-new-table.component.html',
  styleUrls: ['./add-new-table.component.css'],
  standalone: false,
})
export class AddNewTableComponent {
  // ------------------------------------------- VIEW CHILD REFERENCE -------------------------------------------

  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  // ------------------------------------------- PHOTOS -------------------------------------------
  photos: (string | null)[] = [];
  photoFiles: (File | null)[] = [];
  existingPhotoId: number | null = null;

  // Users (for dropdown & modal)
  users: any[] = [];
  tables: any[] = [];
  selectedUser: User | null = null;
  form!: FormGroup;
  // ------------------------------------------- MODE -------------------------------------------

  mode: 'add' | 'edit' | 'view' = 'add';
  id: number | null = null; // route profile id

  // ------------------------------------------- LOCAL RECORD IDS -------------------------------------------
  profileRecordId: number | null = null;
  familyRecordId: number | null = null;
  partnerRecordId: number | null = null;

  // ------------------------------------------- FORM FIELDS -------------------------------------------

  tableFields: FormField[] = addTableFormFields;
  tableColumnFields: FormField[] = addTableColumnFormFields;
  tableRecordFields: FormField[] = addDropdownValueFormFields;

  // ------------------------------------------- ALERT -------------------------------------------

  useModalAlert: boolean = false;
  alert: AlertData | null = null;
  columnFormGroups: FormGroup[] = [];
  dropdownForm!: FormGroup;

  alertStatus: 'success' | 'error' | 'warning' = 'success';
  alertTitle = '';
  alertDescription = '';
  showAlert = false;
  currentLoggedStaff: any;
  currentUserId: number | undefined;
  // ------------------------------------------- TABLE COLUMN FORMS (DYNAMIC) -------------------------------------------
  tableColumnForms: FormField[][] = [
    addTableColumnFormFields.map((f) => ({ ...f })),
  ];
  currentUserName: string | undefined;

  // ------------------------------------------- CONSTRUCTOR -------------------------------------------

  constructor(
    public tableService: TableService,
    public tableColumnsService: TableColumnsService,
    public dropdownService: DropdownValuesService,
    public userService: UserService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private userModalService: UserModalService,
    private tableRecordService: TableModalService,
    private addEditModalService: AddEditModalService,
    private tableColumnService: TableColumnModalService,
    private spinner: SpinnerLoadingService,
    private service: RoleService,
    private authService: AuthService,

  ) { }

  // ------------------------------------------- LIFECYCLE -------------------------------------------

  ngOnInit(): void {

    // 4. Auth check
    this.currentLoggedStaff = this.authService.getUser();

    if (!this.currentLoggedStaff) {
      this.authService.redirectToLogin();
      return;
    }

    this.currentLoggedStaff.id = this.currentUserId || -1;
    this.currentLoggedStaff.name = this.currentUserName || 'Unknown';



    this.form = this.fb.group({
      name: [null], // control for bootstrap-form-input
      user_id: [null], // hidden field for actual relation
    });
    // Read params
    this.route.paramMap.subscribe((params) => {
      const mode = params.get('mode');
      const id = params.get('id');

      if (mode) this.mode = mode as 'add' | 'edit' | 'view';
      if (id) this.id = +id;

      if (this.id) {
        this.loadTable(this.id);
      }


    });

    this.getUsers();
  }

  // ------------------------------------------- USER HANDLING -------------------------------------------

  openAddUser() {
    this.service.getAll().subscribe({
      next: (res: { data: any[] }) => {
        const roles = res.data.map((role: any) => ({
          label: role.name, // what user sees
          value: role.id, // what gets submitted
        }));

        // Clone your form fields and inject role dropdown
        const formFields = addUserFormFields.map((field: any) => {
          if (field.name === 'role_id') {
            return { ...field, options: roles }; // set role dropdown options
          }
          return field;
        });

        this.addEditModalService.addItem(
          'user',
          () => formFields,
          (data: User) => this.userService.create(data), // only create
          () => this.getUsers(),
          this.spinner,
          (a: any) => (this.alert = a),
          this.useModalAlert
        );
      },
      error: (err: any) => {
        console.error('Failed to fetch roles', err);
      },
    });
  }

  handleUserModal() {
    const dialogRef = this.userModalService.open(this.users);

    dialogRef.afterClosed().subscribe((selected: User) => {
      if (selected) {
        this.selectedUser = selected;

        // 👇 Patch the user name or email into the input field
        this.form.patchValue({
          name: selected.name, // or selected.email
          user_id: selected.id, // keep hidden relation
        });
      }
    });
  }

  // ------------------------------------------- MODAL USER FOR LOOKUP FIELDS -------------------------------------------

  onFormReady(form: FormGroup) {
    this.form = form;
  }

  handleUsersModal(event: {
    rowIndex: number;
    colKey: string;
    callback: (result: any) => void;
  }) {

    // Check if the clicked field is a lookup modal field
    const lookupFields = [
      'owner_id',
      'created_by',
      'status_controlled_by',
      'data_controlled_by',
      'visibility_controlled_by',
    ]; // add more fields if needed
    if (lookupFields.includes(event.colKey)) {
      const dialogRef = this.userModalService.open(this.users);

      dialogRef.afterClosed().subscribe((selected: User | null) => {
        if (selected) {

          // Pass selected user to callback for DynamicForm to handle modalMap
          event.callback({
            id: selected.id,
            name: selected.name,
            email: selected.email,
          });
        }
      });
    }
  }

  // ------------------------------------------- TABLES COLUMN MODAL -------------------------------------------

  onFormsReady(form: FormGroup) {
    this.form = form;
  }
  handleTableColumnsModal(event: {
    rowIndex: number;
    colKey: string;
    callback: (result: any) => void;
  }) {

    const lookupFields = ['table_id', 'column_id']; // add more fields if needed

    if (lookupFields.includes(event.colKey)) {
      // Step 1: Fetch tables from the service
      this.tableService.getAll().subscribe((tables) => {
        // Step 2: Open modal with fetched tables
        const dialogRef = this.tableRecordService.open(tables.data || []);

        // Step 3: Handle selected table from modal
        dialogRef.afterClosed().subscribe((selected: Table | null) => {
          if (selected) {
            console.log('Selected table:', selected);

            // Pass selected table to callback
            event.callback({
              id: selected.id,
              name: selected.name,
            });
          }
        });
      });
    }
  }

  // ------------------------------------------- DROPDOWN HANDLING -------------------------------------------

  onDropdownReady(form: FormGroup) {
    this.form = form;
  }
  handleDropdownModal(event: {
    rowIndex: number;
    colKey: string;
    callback: (result: any) => void;
  }) {

    const lookupFields = ['table_id', 'column_id']; // add more fields if needed

    if (lookupFields.includes(event.colKey)) {
      // Step 1: Fetch tables from the service
      this.tableColumnsService.getAll().subscribe((tables) => {
        // Step 2: Open modal with fetched tables
        const dialogRef = this.tableColumnService.open(tables.data || []);

        // Step 3: Handle selected table from modal
        dialogRef.afterClosed().subscribe((selected: Table | null) => {
          if (selected) {

            // Pass selected table to callback
            event.callback({
              id: selected.id,
              name: selected.name,
            });
          }
        });
      });
    }
  }

  // ------------------------------------------- GET USERS -------------------------------------------

  getUsers() {
    // Populate user options
    this.userService.getAll().subscribe((response: any) => {
      if (response?.data) {
        this.users = response.data;
        const userOptions = response.data.map((user: any) => ({
          label: user.email,
          value: user.id,
        }));
        const userIdField = this.tableFields.find((f) => f.name === 'user_id');
        if (userIdField) userIdField.options = userOptions;
      }
    });
  }

  // ------------------------------------------- GET BY ID, CREATE AND UPDATE PROFILE -------------------------------------------

  loadTable(id: number) {
    this.tableService.getById(id).subscribe({
      next: (res: any) => {
        const data = res.data || {};
        this.profileRecordId = data.id ?? null;

        // Patch main table fields
        this.tableFields.forEach((f) => {
          if (data[f.name] !== undefined) f.value = data[f.name];
        });

        // Patch table columns
        if (data.columns) {
          this.tableColumnForms = data.columns.map((c: { [x: string]: any }) =>
            addTableColumnFormFields.map((f) => ({
              ...f,
              value: c[f.name] ?? null,
            }))
          );
        }

        // Patch table records
        if (data.records) {
          this.tableRecordFields.forEach((f) => {
            f.value = data.records[0]?.[f.name] ?? null;
          });
        }

        // Force change detection for UI
        this.tableFields = [...this.tableFields];
        this.tableColumnForms = [...this.tableColumnForms];
        this.tableRecordFields = [...this.tableRecordFields];
      },
      error: (err) => console.error('Error fetching profile:', err),
    });
  }

  tableSubmit(data: any) {
    data.user_id = data.user_id ?? this.selectedUser?.id ?? null;
    data.owner_id =
      data.owner_id ?? data.user_id ?? this.selectedUser?.id ?? null;
    data.user_id = data.user_id ?? this.selectedUser?.id ?? null;

    if (this.profileRecordId) {
      this.updateTable(this.profileRecordId, data);
    } else {
      this.createTable(data);
    }
  }

  createTable(table: Table) {
    this.tableService.create(table).subscribe({
      next: (res: ApiResponse) => {
        if (res?.data?.id) {
          this.profileRecordId = res.data.id;
          const profileIdField = this.tableFields.find((f) => f.name === 'id');
          if (profileIdField) profileIdField.value = this.profileRecordId;
          this.tableFields = [...this.tableFields];
        } else {
        }
      },
      error: () => { },
    });
  }

  updateTable(id: number, table: Table) {
    this.tableService.update(id, table).subscribe({
      next: (res: ApiResponse) => {
        if (res?.data?.id) {
          this.profileRecordId = res.data.id;
          const profileIdField = this.tableFields.find((f) => f.name === 'id');
          if (profileIdField) profileIdField.value = this.profileRecordId;
          this.tableFields = [...this.tableFields];
        } else {
        }
      },
      error: () => { },
    });
  }

  // ------------------------------------------- CREATE AND UPDATE TABLE RECORDS -------------------------------------------

  tableRecordSubmit(partner: DropdownValue) {
    if (this.partnerRecordId) {
      this.updatePartner(this.partnerRecordId, partner);
    } else {
      this.createPartner(partner);
    }
  }

  createPartner(partner: any) {
    if (!this.profileRecordId) {
      console.warn('No profile id available. Please create profile first.');
      return;
    }
    partner.profile_id = this.profileRecordId;
    this.dropdownService.create(partner).subscribe({
      next: (res: ApiResponse) => {
        if (res?.data?.id) {
          this.partnerRecordId = res.data.id;
          const partnerIdField = this.tableRecordFields.find(
            (f) => f.name === 'id'
          );
          if (partnerIdField) partnerIdField.value = this.partnerRecordId;
          this.tableRecordFields = [...this.tableRecordFields];
        }
      },
      error: () => { },
    });
  }

  updatePartner(id: number, partner: DropdownValue) {
    if (!this.profileRecordId) {
      console.warn('No profile id available. Please create profile first.');
      return;
    }
    partner.id = this.profileRecordId;
    this.dropdownService.update(id, partner).subscribe({
      next: (res: ApiResponse) => {
        if (res?.data?.id) {
          this.partnerRecordId = res.data.id;
          const partnerIdField = this.tableRecordFields.find(
            (f) => f.name === 'id'
          );
          if (partnerIdField) partnerIdField.value = this.partnerRecordId;
          this.tableRecordFields = [...this.tableRecordFields];
        }
      },
      error: () => { },
    });
  }
  // Add new table column form
  addColumnForm() {
    const newForm = addTableColumnFormFields.map((f) => ({ ...f })); // clone
    this.tableColumnForms.push(newForm);
  }
  // Remove table column form
  removeColumnForm(index: number) {
    this.tableColumnForms.splice(index, 1);
  }
  // Capture each dynamic form's FormGroup
  // Table Dropdown form ready
  onDropdownFormReady(form: FormGroup) {
    this.dropdownForm = form;
    this.onFormReady(form); // optional

    const valueField = this.dropdownForm.get('value');
    const isDropdownField = this.dropdownForm.get('is_dropdown');

    if (isDropdownField && valueField) {
      isDropdownField.valueChanges.subscribe(val => {
        if (val === 1) { // Yes
          valueField.setValidators([Validators.required]);
        } else { // No
          valueField.clearValidators();
          valueField.setValue(''); // clear input
        }
        valueField.updateValueAndValidity();
      });

      // Initialize on load
      if (isDropdownField.value !== 1) {
        valueField.clearValidators();
        valueField.setValue('');
        valueField.updateValueAndValidity();
      }
    }
  }
  // Table Dropdown modal
  onDropdownOpenModal(event: any) {
    this.handleDropdownModal(event);
    this.handleUsersModal(event); // if needed
  }

  // Table Column form ready
  onColumnFormReady(form: FormGroup, index: number) {
    this.columnFormGroups[index] = form;
    this.onFormsReady(form); // optional
    this.onFormReady(form); // optional
  }

  // Table Column modal
  onColumnOpenModal(event: any, index: number) {
    this.handleTableColumnsModal(event);
    this.handleUsersModal(event); // optional
  }

  submitAllColumns() {
    if (!this.profileRecordId) {
      console.warn('Profile/Table ID missing!');
      return;
    }

    if (!this.columnFormGroups?.length) {
      console.warn('No column forms found!');
      return;
    }

    // Split into new vs existing
    const newRecords: any[] = [];
    const updateRecords: any[] = [];

    this.columnFormGroups.forEach((form) => {
      if (!form.valid) return;

      const val = {
        ...form.value,
        table_id: this.profileRecordId,
        owner_id: this.selectedUser?.id ?? 1,
        created_by: this.selectedUser?.id ?? 1,
      };

      if (val.id) {
        updateRecords.push(val); // has ID → update
      } else {
        newRecords.push(val); // no ID → create
      }
    });

    // 1️⃣ Bulk Create
    if (newRecords.length) {
      this.tableColumnsService.create({ records: newRecords }).subscribe({
        next: (res) => console.log('Created columns:', res),
        error: (err) => console.error('Create failed:', err),
      });
    }

    // 2️⃣ Bulk Update
    if (updateRecords.length) {
      this.tableColumnsService.bulkUpdate({ records: updateRecords }).subscribe({
        next: (res) => console.log('Updated columns:', res),
        error: (err) => console.error('Update failed:', err),
      });
    }

    // Optional: success alert
    this.alertStatus = 'success';
    this.alertTitle = 'Saved';
    this.alertDescription = 'Table columns processed successfully.';
    this.showAlert = true;
  }


}
