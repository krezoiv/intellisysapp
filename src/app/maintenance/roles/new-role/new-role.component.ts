import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RoleModel } from 'src/app/data/models/role.model';
import { RolesService } from 'src/app/services/roles.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-new-role',
  templateUrl: './new-role.component.html',
  styleUrls: ['./new-role.component.css'],
})
export class NewRoleComponent {
  public roles: RoleModel[] = [];

  public roleForm: FormGroup = this.fb.group({
    roleName: ['', Validators.required],
  });

  constructor(private fb: FormBuilder, private _roleService: RolesService) {}

  createRole() {
    this._roleService.createRole(this.roleForm.value).subscribe(
      (data) => {
        console.log(this.roleForm.value);
        Swal.fire('Exitoso', 'creado correctamente');
        console.log('Guardado');
      },
      (err) => {
        Swal.fire('Error', err.error.msg, 'error');
        console.log(' No Guardado');
      }
    );
  }
}
