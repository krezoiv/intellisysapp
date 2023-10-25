import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { CampusModel } from 'src/app/data/models/campus.models';
import { DepartmetsModel } from 'src/app/data/models/department.model';
import { EmployeeTypeModel } from 'src/app/data/models/employee-type';
import { MunicipalityModel } from 'src/app/data/models/municipality.models';
import { WorkPositionModel } from 'src/app/data/models/work-position.models';
import { EmployeesService } from 'src/app/services/employees.service';
import { LocationService } from 'src/app/services/location.service';
import { WorkPositionService } from 'src/app/services/work-position.service';

@Component({
  selector: 'app-dialog-edit-employee',
  templateUrl: './dialog-edit-employee.component.html',
  styleUrls: ['./dialog-edit-employee.component.css'],
})
export class DialogEditEmployeeComponent {
  employeeForm!: FormGroup;

  public campus: CampusModel[] = [];
  public workPosition: WorkPositionModel[] = [];
  public employeeType: EmployeeTypeModel[] = [];
  public departments: DepartmetsModel[] = [];
  public municipality: MunicipalityModel[] = [];


  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA)  public editEmployee : any,
    private dialogRef: MatDialogRef<DialogEditEmployeeComponent>,
    private _locationService: LocationService,
    private _employeeService: EmployeesService,
    private _workPositionService: WorkPositionService
  ) {}

  ngOnInit(): void {

    this.loadCampus();
    this.loadDepartments();
    this.loadEmployeeType();
    
   this.employeeForm = this.fb.group({
    code: ['', Validators.required],
    firstName: ['', Validators.required],
    secondName: ['', Validators.required],
    firstLastName: ['', Validators.required],
    secondLastName: ['', Validators.required],
    hireDate: ['', Validators.required],
    idCampus: ['', Validators.required],
    idEmployeeType: ['', Validators.required],
    idStatus: [1],
    idWorkPosition: ['', Validators.required],
    idDepartment: ['', Validators.required],
    idMunicipality: ['', Validators.required],
    addressReference: ['', Validators.required],
    BACaccount: ['', Validators.required],
    BAMaccount: ['', Validators.required],
   });
   if(this.editEmployee){
   this.employeeForm.controls['code'].setValue(this.editEmployee.code);
   this.employeeForm.controls['firstName'].setValue(this.editEmployee.firstName);
   this.employeeForm.controls['secondName'].setValue(this.editEmployee.secondName);
   this.employeeForm.controls['firstLastName'].setValue(this.editEmployee.firstLastName);
   this.employeeForm.controls['secondLastName'].setValue(this.editEmployee.secondLastName);
   this.employeeForm.controls['hireDate'].setValue(this.editEmployee.hireDate);
   this.employeeForm.controls['idCampus'].setValue(this.editEmployee.idCampus);
   this.employeeForm.controls['idEmployeeType'].setValue(this.editEmployee.employeeType);
   this.employeeForm.controls['idWorkPosition'].setValue(this.editEmployee.workPosition);
   this.employeeForm.controls['idDepartment'].setValue(this.editEmployee.department);
   this.employeeForm.controls['idMunicipality'].setValue(this.editEmployee.municipality);
   this.employeeForm.controls['addressReference'].setValue(this.editEmployee.addressReference);
   this.employeeForm.controls['BACaccount'].setValue(this.editEmployee.BACaccount);
   this.employeeForm.controls['BAMaccount'].setValue(this.editEmployee.BAMaccount);
  }
  }

  
  loadCampus() {
    this._locationService.getCampusList().subscribe(
      (campusList) => {
        // Maneja la respuesta exitosa y almacena la lista de campus.
        this.campus = campusList;
      },
      (error) => {
        // Maneja errores en la solicitud y muestra mensajes de error en la consola.
        console.error('Error al obtener la lista de campus:', error);
      }
    );
  }

  loadEmployeeType() {
    this._employeeService.getEmployeesTypeList().subscribe(
      (employeeTypeList) => {
        this.employeeType = employeeTypeList;
      },
      (error) => {
        console.log('Error al obtener la lista de departamentos:', error);
      }
    );
  }

  loadWorkPositionByEmployeeType(idEmployeeType: number) {
    this._employeeService.getWorkpositionByEmployees(idEmployeeType).subscribe(
      (workPositions) => {
        this.workPosition = workPositions; // Asegúrate de que workPositions contenga los valores adecuados
        console.log('workPositions:', workPositions); // Agrega esto para depurar
      },
      (error) => {
        console.error('Error al obtener la lista de cargos:', error);
      }
    );
  }

  onEmployeesTypeSelected(event: any) {
    const selectedEmployeeTypeId = event.value;
    if (
      selectedEmployeeTypeId !== undefined &&
      selectedEmployeeTypeId !== null
    ) {
      this.loadWorkPositionByEmployeeType(selectedEmployeeTypeId);
      this.employeeForm.patchValue({ idWorkPosition: '' }); // Esto inicializará el campo a vacío
    }
  }

  loadDepartments() {
    this._locationService.getDepartmentsList().subscribe(
      (departmentsList) => {
        // Maneja la respuesta exitosa y almacena la lista de departamentos.
        this.departments = departmentsList;
      },
      (error) => {
        // Maneja errores en la solicitud y muestra mensajes de error en la consola.
        console.error('Error al obtener la lista de departamentos:', error);
      }
    );
  }

  loadMunicipalitiesByDepartment(departmentID: number) {
    this._locationService.getMunicipalitiesByDepartment(departmentID).subscribe(
      (municipalities) => {
        // Maneja la respuesta exitosa y almacena la lista de municipios.
        this.municipality = municipalities;
      },
      (error) => {
        // Maneja errores en la solicitud y muestra mensajes de error en la consola.
        console.error('Error al obtener la lista de municipios:', error);
      }
    );
  }

  onDepartmentSelected(event: any) {
    const selectedDepartmentID = event.value; // Utiliza event.value para obtener el valor seleccionado
    console.log('Selected Department ID:', selectedDepartmentID);

    if (selectedDepartmentID !== undefined && selectedDepartmentID !== null) {
      // Llama a la función para cargar los municipios por departamento.
      this.loadMunicipalitiesByDepartment(selectedDepartmentID);
    }
  }

  editEmployees() {}
}
