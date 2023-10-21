import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { RoleModel } from 'src/app/data/models/role.model';
import { RolesService } from 'src/app/services/roles.service';

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

  constructor(
    private fb: FormBuilder,
    private _roleService: RolesService,
    private toastr: ToastrService
  ) {}

  createRole() {
    this._roleService.createRole(this.roleForm.value).subscribe(
      (data: any) => {
        // Captura el mensaje de éxito de la respuesta del servidor
        const successMessage = data.message;

        // Muestra el mensaje de éxito utilizando Toastr
        this.toastr.success(successMessage, 'Éxito');

        // Puedes realizar cualquier otra acción después de un éxito aquí
      },
      (err) => {
        // Utiliza el mensaje de error proporcionado por el servidor
        this.toastr.error(err.error.error || 'Error desconocido', 'Error');
        console.log('No Guardado');
      }
    );
  }
}
