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
      if (data.message) {
        // Comprobar si la respuesta contiene un mensaje de éxito
        const successMessage = data.message;
        
        // Muestra el mensaje de éxito utilizando Toastr
        this.toastr.success(successMessage, 'Éxito');
        this.roleForm.reset();
        
        // Puedes realizar cualquier otra acción después de un éxito aquí
      } else {
        // Si la respuesta no contiene un mensaje de éxito, muestra un mensaje genérico
        this.toastr.error('Error inesperado, intente de nuevo', 'Error');
        console.log('No Guardado');
      }
    },
    (err) => {
      // Utiliza el mensaje de error proporcionado por el servidor
      this.toastr.error(err.error.error || 'Error inesperado, intente de nuevo', 'Error');
      console.log('No Guardado');
    }
  );
}



}
