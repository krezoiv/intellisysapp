import { DatePipe } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { CampusModel } from 'src/app/data/models/campus.models';
import { DepartmetsModel } from 'src/app/data/models/department.model';
import { EmployeeTypeModel } from 'src/app/data/models/employee-type';
import { EmployeesModel } from 'src/app/data/models/employees.model';
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
  public employeeData!: EmployeesModel; // Debes importar EmployeesModel desde tu modelo
  employeeForm!: FormGroup;

  public campus: CampusModel[] = [];
  public workPosition: WorkPositionModel[] = [];
  public employeeType: EmployeeTypeModel[] = [];
  public departments: DepartmetsModel[] = [];
  public municipality: MunicipalityModel[] = [];


  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private datePipe: DatePipe, // Inyecta DatePipe
    @Inject(MAT_DIALOG_DATA)  public editEmployee : any,
    private dialogRef: MatDialogRef<DialogEditEmployeeComponent>,
    private _locationService: LocationService,
    private _employeeService: EmployeesService,
    private _workPositionService: WorkPositionService
  ) {}

  ngOnInit(): void {

    
    
   this.employeeForm = this.fb.group({
    code: ['', Validators.required],
    firstName: ['', Validators.required],
    secondName: ['', Validators.required],
    firstLastName: ['', Validators.required],
    secondLastName: ['', Validators.required],
    hireDate: ['', Validators.required],
    idCampus: ['', Validators.required],
    idEmployeeType: ['', Validators.required],
    idWorkposition: ['', Validators.required],
    idStatus: [1],
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
   const parts = this.editEmployee.hireDate.split('-');
  if (parts.length === 3) {
    const day = +parts[0]; // Convierte a número
    const month = +parts[1];
    const year = +parts[2];
    const formattedHireDate = new Date(year, month - 1, day); // El mes debe ser 0-based
    this.employeeForm.controls['hireDate'].setValue(formattedHireDate);
  }
   this.employeeForm.controls['idCampus'].setValue(this.editEmployee.idCampus);
   this.employeeForm.controls['idEmployeeType'].setValue(this.editEmployee.idEmployeeType);
   this.employeeForm.controls['idWorkposition'].setValue(this.editEmployee.idWorkposition);
   this.employeeForm.controls['idDepartment'].setValue(this.editEmployee.idDepartment);
   this.employeeForm.controls['idMunicipality'].setValue(this.editEmployee.idMunicipality);
   this.employeeForm.controls['addressReference'].setValue(this.editEmployee.addressReference);
   this.employeeForm.controls['BACaccount'].setValue(this.editEmployee.BACaccount);
   this.employeeForm.controls['BAMaccount'].setValue(this.editEmployee.BAMaccount);
  }

  
  this.loadCampus();
    this.loadDepartments();
  
    this.loadEmployeeType();

    this.getMunicipality();
    this.getWorkPosition();
    console.log('formulario ', this.employeeForm.value)

    
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
      this.employeeForm.patchValue({ idWorkposition: '' }); // Esto inicializará el campo a vacío
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

  getMunicipality(){
    const idMunicipality = this.employeeForm!.get('idMunicipality')!.value;
    this._locationService.getMunicipalityById(idMunicipality).subscribe(
      (municipality)=>{
        this.municipality = municipality
        console.log(municipality)
      }
    )
  }

  getWorkPosition(){
    const idWorkposition = this.employeeForm!.get('idWorkposition')!.value;
    this._workPositionService.getWorkPositionById(idWorkposition).subscribe(
      (workPosition)=> {
        this.workPosition = workPosition
        console.log(workPosition)
      }
    )
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

  
  editEmployees() {
    console.log(this.employeeForm.value)
  }
}
