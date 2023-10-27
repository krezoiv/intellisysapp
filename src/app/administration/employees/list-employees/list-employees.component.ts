import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { EmployeesService } from 'src/app/services/employees.service';
import { EmployeesModel } from 'src/app/data/models/employees.model';
import { DialogEditEmployeeComponent } from '../dialog-edit-employee/dialog-edit-employee.component';
import { DialogDeleteEmployeeComponent } from '../dialog-delete-employee/dialog-delete-employee.component';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-list-employees',
  templateUrl: './list-employees.component.html',
  styleUrls: ['./list-employees.component.css'],
})
export class ListEmployeesComponent {
  displayedColumns: string[] = [
    'idEmployee',
    'position',
    'userCode',
    'firstName',
    'secondName',
    'firstLastName',
    'secondLastName',
    'hireDate',
    'idCampus',
    'campus',
    'idWorkposition',
    'workPosition',
    'idMunicipality',
    'municipality',
    'addressReference',
    'BACaccount',
    'BAMaccount',
    'actions',
  ];
  dataSource: MatTableDataSource<EmployeesModel> =
    new MatTableDataSource<EmployeesModel>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _employeesService: EmployeesService,
    private _editEmployeeDialog: MatDialog,
    private _deleteEmployeeDialog: MatDialog,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getEmployeeList();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getEmployeeList() {
    this._employeesService.getEmployeeDetails().subscribe(
      (employees) => {
        // Asignar la lista de empleados al dataSource
        this.dataSource.data = employees;
        console.log(employees);
      },
      (error) => {
        // Maneja errores en caso de que ocurran al obtener la lista de empleados.
        console.error('Error al obtener la lista de empleados:', error);
      }
    );
  }

  openEditUserDialog(row: EmployeesModel) {
    this._editEmployeeDialog.open(DialogEditEmployeeComponent, {
      width: '70%',
      data: row,
    });
  }

  openDeleteUserDialog(row: EmployeesModel) {
    this._deleteEmployeeDialog.open(DialogDeleteEmployeeComponent, {
      width: '50%',
      data: row,
    });
  }

  deActivateEmployee(idEmployee: number) {
    // Primero, obtén el nombre del empleado utilizando una llamada al servidor
    this._employeesService.getEmployeeDetails().subscribe(
      (employees: EmployeesModel[]) => {
        const employee = employees.find((e) => e.idEmployee === idEmployee);
        if (employee) {
          const fullName = `<strong>${employee.firstName} ${employee.firstLastName}</strong>`; // Nombre en negrita
          // Ahora, muestra la alerta con el nombre del empleado en negrita
          Swal.fire({
            title: '¿Estás seguro?',
            html: `Esta acción desactivará al empleado ${fullName}. ¿Estás seguro que deseas continuar?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí, desactivar',
            cancelButtonText: 'Cancelar',
          }).then((result) => {
            if (result.isConfirmed) {
              // Llamada directa al servicio para desactivar al empleado
              this._employeesService.deActivateEmployee(idEmployee).subscribe(
                (data: any) => {
                  if (data.message) {
                    const successMessage = data.message;
                    // Maneja la respuesta exitosa aquí, por ejemplo, muestra un mensaje de éxito.
                    this.getEmployeeList(); // Actualiza la lista de empleados después de la desactivación
                    Swal.fire(
                      `Empleado ${fullName} desactivado`,
                      successMessage,
                      'success'
                    );
                  } else {
                    // Si la respuesta no contiene un mensaje de éxito, muestra un mensaje genérico
                    Swal.fire('Error inesperado', 'Intente de nuevo', 'error');
                  }
                },
                (err) => {
                  // Maneja los errores, por ejemplo, muestra un mensaje de error.
                  console.error('Error al desactivar al empleado:', err);
                  Swal.fire(
                    'Error al desactivar al empleado',
                    err.error.error || 'Error inesperado',
                    'error'
                  );
                }
              );
            }
          });
        } else {
          // Maneja el caso en el que no se encontró el empleado
          Swal.fire('Error', 'No se encontró el empleado', 'error');
        }
      },
      (error) => {
        // Maneja errores en caso de que ocurran al obtener la lista de empleados.
        console.error('Error al obtener la lista de empleados:', error);
      }
    );
  }
  
}
