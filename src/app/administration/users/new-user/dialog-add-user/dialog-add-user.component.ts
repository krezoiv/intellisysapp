import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserModel } from 'src/app/data/models/user.model';
import { UsersService } from 'src/app/services/users.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RoleModel } from 'src/app/data/models/role.model';
import { RolesService } from 'src/app/services/roles.service';
import { ToastrService } from 'ngx-toastr';
import { EmployeesModel } from 'src/app/data/models/employees.model';
import Swal from 'sweetalert2';

const onlyChar = /^[a-zA-ZñÑ0-9]*[/*$%&+.]+[a-zA-ZñÑ0-9]*$/;
const passPattern =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[/*$%&+.]+)[a-zA-ZñÑ0-9/*$%&+.]+$/;

@Component({
  selector: 'app-dialog-add-user',
  templateUrl: './dialog-add-user.component.html',
  styleUrls: ['./dialog-add-user.component.css'],
})
export class DialogAddUserComponent {
  public fieldsErrorMessages = {
    patternPass:
      '*El campo es obligatorio, debe tener mínimo de 8 dígitos, una mayúscula, una minúscula y un carácter especial /*$%&+. ',
    required: '*Campo requerido',
  };
  userForm!: FormGroup;
  public users: UserModel[] = [];
  public roles: RoleModel[] = [];

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public addNewUser: any,
    private dialogRef: MatDialogRef<DialogAddUserComponent>,
    private _userService: UsersService,
    private _roleService: RolesService
  ) {}

  ngOnInit(): void {
    this.userForm = this.fb.group({
      campusName: [''],
      userCode: [''],
      firstName: [''],
      firstLastName: [''],
      userName: ['',],
      password: ['',[Validators.required, Validators.minLength(8),Validators.pattern(passPattern)]],
      idRole: ['', Validators.required],
      idStatus: ['1'],
      idEmployee: [''],
    });

   
    if (this.addNewUser) {
      this.userForm.controls['campusName'].setValue(this.addNewUser.campusName);
      this.userForm.controls['userCode'].setValue(this.addNewUser.code);
      this.userForm.controls['firstName'].setValue(this.addNewUser.firstName);
      this.userForm.controls['firstLastName'].setValue(
        this.addNewUser.firstLastName
      );
      this.userForm.controls['idEmployee'].setValue(this.addNewUser.idEmployee);
    }
    this.loadRoles();
  }

  isValidField(field: string) {
    return (
      this.userForm.controls[field].errors &&
      this.userForm.controls[field].touched
    );
  }

  loadRoles() {
    this._roleService.getRolesList().subscribe((roles) => {
      this.roles = roles;
    });
  }

  createNewUser() {
    // Validar el formulario antes de continuar
    if (this.userForm.invalid) {
      Swal.fire('Formulario inválido', 'Por favor, complete todos los campos.', 'error');
      return;
    }
  
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¿Quieres crear un nuevo usuario?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this._userService.creatUser(this.userForm.value).subscribe(
          (data: any) => {
            if (data.message) {
              // Comprobar si la respuesta contiene un mensaje de éxito
              const successMessage = data.message;
  
              // Muestra el mensaje de éxito utilizando Toastr
              this.toastr.success(successMessage, 'Éxito');
              this.userForm.reset();
              this.dialogRef.close();
              // Puedes realizar cualquier otra acción después de un éxito aquí
            } else {
              // Si la respuesta no contiene un mensaje de éxito, muestra un mensaje genérico
              this.toastr.error('Error desconocido', 'Error');
              console.log('No Guardado');
            }
          },
          (err) => {
            // Utiliza el mensaje de error proporcionado por el servidor
            this.toastr.error(
              err.error.error || 'Error desconocido',
              'Error'
            );
          }
        );
      }
    });
  }
  
}
