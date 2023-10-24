import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeesModel } from 'src/app/data/models/employees.model';
import { EmployeesService } from 'src/app/services/employees.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogAddUserComponent } from './dialog-add-user/dialog-add-user.component';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css']
})
export class NewUserComponent implements OnInit {


  displayedColumns: string[] = ['idEmployee', 'position', 'userCode', 'name', 'lastName', 'idCampus', 'idWorkPosition','addressReference', 'accions'];
  dataSource: MatTableDataSource<EmployeesModel> = new MatTableDataSource<EmployeesModel>(); 
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort ) sort!: MatSort;



  constructor(
   
    private _employeesService: EmployeesService,
    private _addUserdialog : MatDialog
  ) {
    
  }

  ngOnInit(): void {
    this.getEmployeeList();
  }
   
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
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

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

openAddNewUserDialog(row: any){
  this._addUserdialog.open(DialogAddUserComponent, {
    width: '30%',
    data: row
  });
}
     
}
