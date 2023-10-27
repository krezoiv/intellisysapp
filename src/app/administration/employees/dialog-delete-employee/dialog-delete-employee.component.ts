import { Component, Inject } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { EmployeesService } from 'src/app/services/employees.service';

@Component({
  selector: 'app-dialog-delete-employee',
  templateUrl: './dialog-delete-employee.component.html',
  styleUrls: ['./dialog-delete-employee.component.css'],
})
export class DialogDeleteEmployeeComponent {
  employeeForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public deleteEmployee: any,
    private dialogRef: MatDialogRef<DialogDeleteEmployeeComponent>,
    private _employeeService: EmployeesService
  ) {}

  ngOnInit(): void {
    this.employeeForm = this.fb.group({
      idEmployee: ['', Validators.required],
      code: ['', Validators.required],
      firstName: ['', Validators.required],
      secondName: ['', Validators.required],
      firstLastName: ['', Validators.required],
      secondLastName: ['', Validators.required],
    });

    if (this.deleteEmployee) {
      this.employeeForm.controls['idEmployee'].setValue(
        this.deleteEmployee.idEmployee
      );
      this.employeeForm.controls['code'].setValue(this.deleteEmployee.code);
      this.employeeForm.controls['firstName'].setValue(
        this.deleteEmployee.firstName
      );
      this.employeeForm.controls['secondName'].setValue(
        this.deleteEmployee.secondName
      );
      this.employeeForm.controls['firstLastName'].setValue(
        this.deleteEmployee.firstLastName
      );
      this.employeeForm.controls['secondLastName'].setValue(
        this.deleteEmployee.secondLastName
      );
    }
  }

  deleteEmployeee() {
    const idEmployee = this.employeeForm!.get('idEmployee')!.value; // Obtén el ID del empleado a partir de la variable `editEmployee`
    this._employeeService.deleteEmployee(idEmployee).subscribe(
      (data : any) => {
        if(data.message){
          const successMessage = data.message;
          // Muestra el mensaje de éxito utilizando Toastr
          this.toastr.success(successMessage, 'Éxito');
          this.employeeForm.reset();
        }else {
          this.toastr.error('Error inesperado, intente de nuevo', 'Error');
        }
      }, 
      (err) => {
        this.toastr.error(err.error.error || 'Error inesperado, intente de nuevo', 'Error');
      }
    )
  
  }
}
