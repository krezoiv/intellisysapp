import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserModel } from 'src/app/data/models/user.model';
import { UsersService } from 'src/app/services/users.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RoleModel } from 'src/app/data/models/role.model';
import { RolesService } from 'src/app/services/roles.service';
import { ToastrService } from 'ngx-toastr';
import { EmployeesModel } from 'src/app/data/models/employees.model';

@Component({
  selector: 'app-dialog-add-user',
  templateUrl: './dialog-add-user.component.html',
  styleUrls: ['./dialog-add-user.component.css'],
})
export class DialogAddUserComponent {
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
      campusName: ['', Validators.required],
      userCode: ['', Validators.required],
      firstName: ['', Validators.required],
      firstLastName: ['', Validators.required],
      userName: ['', Validators.required],
      password: ['', Validators.required],
      idRole: ['', Validators.required],
      idStatus: ['1', Validators.required],
      idEmployee: ['', Validators.required],
    });

    console.log(this.addNewUser);
    if (this.addNewUser) {
      this.userForm.controls['campusName'].setValue(this.addNewUser.campusName);
      this.userForm.controls['userCode'].setValue(this.addNewUser.code);
      this.userForm.controls['firstName'].setValue(this.addNewUser.firstName);
      this.userForm.controls['firstLastName'].setValue(this.addNewUser.firstLastName);
      this.userForm.controls['idEmployee'].setValue(this.addNewUser.idEmployee);
    }
    this.loadRoles();
  }

  loadRoles() {
    this._roleService.getRolesList().subscribe((roles) => {
      this.roles = roles;
    });
  }


  createNewUser() {
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
        this.toastr.error(err.error.error || 'Error desconocido', 'Error');
        console.log('No Guardado');
      }
    );
  }
}
