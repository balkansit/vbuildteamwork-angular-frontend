import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { RoleService } from '../../services/role.service';
import { getRoleEditFormFields, Role } from '../../models/role.model';
import { FormField } from '@lib/models/FormField.model';

@Component({
  selector: 'app-role-form',
  standalone: false,
  templateUrl: './role-form.component.html',
  styleUrls: ['./role-form.component.css'],
})
export class RoleFormComponent implements OnInit {
  roleId: number | null = null;
  formFields: FormField[] = [];
  initialData: any = {};
  isEditMode = false;

  constructor(
    private roleService: RoleService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.roleId = +params['id'];
        this.isEditMode = true;
        this.loadRoleData(this.roleId);
      }
    });
  }

  loadRoleData(id: number) {
    this.roleService.show(id).subscribe((res: any) => {
      const role = res.data || res;
      this.initialData = role;
      this.formFields = getRoleEditFormFields(role);
    });
  }

  handleSave(formData: any) {
    if (this.isEditMode && this.roleId) {
      this.roleService.update(this.roleId, formData).subscribe(() => {
        this.router.navigate(['../../roles'], { relativeTo: this.route });
      });
    } else {
      this.roleService.create(formData).subscribe(() => {
        this.router.navigate(['../../roles'], { relativeTo: this.route });
      });
    }
  }

  handleCancel() {
    this.router.navigate(['../../roles'], { relativeTo: this.route });
  }
}
