import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { EmployeesModel } from 'src/app/data/models/employees.model';
import { RouteModel } from 'src/app/data/models/routes.models';
import { DlpAssignmentService } from 'src/app/services/dlp-assignment.service';
import { EmployeesService } from 'src/app/services/employees.service';
import { LocationService } from 'src/app/services/location.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dlp-assignment',
  templateUrl: './dlp-assignment.component.html',
  styleUrls: ['./dlp-assignment.component.css'],
})
export class DlpAssignmentComponent {
  public employee: EmployeesModel[] = [];
  public dlpAssignmentForm: FormGroup;
  public routes: RouteModel[] = [];

  constructor(
    private toastr: ToastrService,
    private fb: FormBuilder,
    private _employeeService: EmployeesService,
    private _locationService: LocationService,
    private _dlpAssignmentService: DlpAssignmentService
  ) {
    this.dlpAssignmentForm = this.fb.group({
      code: ['', Validators.required],
      idEmployee: ['', Validators.required],
      firstName: ['', Validators.required],
      firstLastName: ['', Validators.required],
      campusName: ['', Validators.required],
      workPosition: ['', Validators.required],
      idRoute: ['', Validators.required],
      idCampus: ['', Validators.required],
      // Define aquí los demás campos del formulario
    });
  }

  ngOnInit(): void {}

  // Método para cargar los datos del empleado
  loadEmployeeData() {
    const code = this.dlpAssignmentForm!.get('code')!.value;

    this._employeeService.getEmployeeByCode(code).subscribe(
      (employeeData) => {
        this.dlpAssignmentForm.controls['firstName'].setValue(
          employeeData[0].firstName
        );
        this.dlpAssignmentForm.controls['firstLastName'].setValue(
          employeeData[0].firstLastName
        );
        this.dlpAssignmentForm.controls['campusName'].setValue(
          employeeData[0].campusName
        );
        this.dlpAssignmentForm.controls['workPosition'].setValue(
          employeeData[0].workPosition
        );
        this.dlpAssignmentForm.controls['idCampus'].setValue(
          employeeData[0].idCampus
        );
        this.dlpAssignmentForm.controls['idEmployee'].setValue(
          employeeData[0].idEmployee
        );
        this.loadRoutes();
      },
      (error) => {
        console.error('Error al obtener datos del empleado:', error);
        // Manejo de errores, puedes mostrar un mensaje de error aquí
      }
    );
  }

  loadRoutes() {
    this._locationService
      .getRoutesByCode(this.dlpAssignmentForm.value)
      .subscribe((data) => {
        this.routes = data;
        console.log(data);
      });
  }

  saveDlpAssginment() {
    if (this.dlpAssignmentForm.valid) {
      Swal.fire({
        title: '¿Estás seguro?',
        text: '¿Deseas guardar la asignación de la ruta al vendedor, DLP?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí',
        cancelButtonText: 'No',
      }).then((result) => {
        if (result.isConfirmed) {
          // El usuario confirmó la acción, puedes continuar con el guardado
          this._dlpAssignmentService
            .addDlpAssignment(this.dlpAssignmentForm.value)
            .subscribe(
              (data: any) => {
                if (data.message) {
                  // Comprobar si la respuesta contiene un mensaje de éxito
                  const successMessage = data.message;

                  // Muestra el mensaje de éxito utilizando Toastr
                  this.toastr.success(successMessage, 'Éxito');
                  this.dlpAssignmentForm.reset();

                  // Puedes realizar cualquier otra acción después de un éxito aquí
                } else {
                  // Si la respuesta no contiene un mensaje de éxito, muestra un mensaje genérico
                  this.toastr.error(
                    'Error inesperado, intente de nuevo',
                    'Error'
                  );
                }
              },
              (err) => {
                // Utiliza el mensaje de error proporcionado por el servidor
                this.toastr.error(
                  err.error.error || 'Error inesperado, intente de nuevo',
                  'Error'
                );
              }
            );
        }
      });
    } else {
      // El formulario no es válido, muestra un Sweet Alert de error
      Swal.fire({
        title: 'Error',
        text: 'Por favor, complete todos los campos requeridos antes de guardar.',
        icon: 'warning',
      });
    }
  }
}
