import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { EmployeesService } from 'src/app/services/employees.service';
import { EmployeesModel } from 'src/app/data/models/employees.model';


@Component({
  selector: 'app-list-employees',
  templateUrl: './list-employees.component.html',
  styleUrls: ['./list-employees.component.css']
})
export class ListEmployeesComponent {

  displayedColumns: string[] = ['idEmployee', 'position','userCode', 'firstName', 'secondName', 'firstLastName', 'secondLastName', 'hireDate', 'idCampus', 'idWorkPosition', 'idMunicipality', 'addressReference', 'BACaccount', 'BAMaccount', 'actions'];
  dataSource: MatTableDataSource<EmployeesModel> = new MatTableDataSource<EmployeesModel>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort ) sort!: MatSort;

  constructor(
    private _employeesService : EmployeesService
  ){}

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
        console.log(this.dataSource)
      },
      (error) => {
        // Maneja errores en caso de que ocurran al obtener la lista de empleados.
        console.error('Error al obtener la lista de empleados:', error);
      }
    );
  }

  openEditUserDialog(row: any){

  }

}
