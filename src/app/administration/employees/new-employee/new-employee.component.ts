import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { CampusModel } from 'src/app/data/models/campus.models';
import { DepartmetsModel } from 'src/app/data/models/department.model';
import { EmployeeTypeModel } from 'src/app/data/models/employee-type';
import { MunicipalityModel } from 'src/app/data/models/municipality.models';
import { WorkPositionModel } from 'src/app/data/models/work-position.models';
import { EmployeesService } from 'src/app/services/employees.service';
import { LocationService } from 'src/app/services/location.service';
import { WorkPositionService } from 'src/app/services/work-position.service';

@Component({
  selector: 'app-new-employee',
  templateUrl: './new-employee.component.html',
  styleUrls: ['./new-employee.component.css'],
})
export class NewEmployeeComponent {
  
  
 /**
 * Propiedad campus
 * 
 * Representa una lista de modelos de campus. Esta lista se utiliza para almacenar y mostrar información sobre campus.
 * @type {CampusModel[]}
 */
public campus: CampusModel[] = [];

/**
 * Propiedad workPosition
 * 
 * Representa una lista de modelos de posiciones de trabajo. Esta lista se utiliza para almacenar información sobre posiciones de trabajo.
 * @type {WorkPositionModel[]}
 */
public workPosition: WorkPositionModel[] = [];


/**
 * Propiedad employeesType
 * 
 * Representa una lista de modelos de tipo de empleado. Esta lista se utiliza para almacenar información sobre tipo de empleado.
 * @type {EmployeeTypeModel[]}
 */
public employeeType: EmployeeTypeModel[] = [];


/**
 * Propiedad departments
 * 
 * Representa una lista de modelos de posiciones de departamentos. Esta lista se utiliza para almacenar información sobre los departamentos de Guatemala.
 * @type {DepartmetsModel[]}
 */
public departments: DepartmetsModel[] = [];

/**
 * Propiedad municipality
 * 
 * Representa una lista de modelos de posiciones de los municipios. Esta lista se utiliza para almacenar información sobre los municipios de los departamentos de Guatemala.
 * @type {MunicipalityModel[]}
 */
public municipality: MunicipalityModel[] = [];

public employeeForm: FormGroup = new FormGroup({
  code: new FormControl(''),
  firstName: new FormControl(''),
  secondName: new FormControl(''),
  firstLastName: new FormControl(''),
  secondLastName: new FormControl(''),
  hireDate: new FormControl(''),
  idCampus: new FormControl(''),
  idEmployeeType: new FormControl(''),
  idWorkPosition: new FormControl(''),
  idStatus: new FormControl(''),
  idDepartment: new FormControl(''),
  idMunicipality: new FormControl(''),
  addressReference: new FormControl(''),
  BACaccount: new FormControl(''),
  BAMaccount: new FormControl(''),
});
  constructor(
    private fb: FormBuilder, 
    private _locationService: LocationService,
    private _employeeService : EmployeesService,
    private _workPositionService : WorkPositionService
    ) {}

  ngOnInit(): void {
    this.loadCampus();
    this.loadDepartments();
    this.loadEmployeeType();
     
  }


// Carga la lista de campus desde el servicio.
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

/*
// Carga la lista de posiciones de trabajo desde el servidor y almacena la lista en 'workPosition'.
loadWorkPosition() {
  this._workPositionService.getWorkList().subscribe(
    (workPositionList) => {
      // Maneja la respuesta exitosa y almacena la lista de posiciones de trabajo.
      this.workPosition = workPositionList;
    },
    (error) => {
      // Maneja errores en la solicitud y muestra mensajes de error en la consola.
      console.error('Error al obtener la lista de puestos:', error);
    }
  );
}
*/

loadEmployeeType(){
  this._employeeService.getEmployeesTypeList().subscribe(
    (employeeTypeList) => {
      this.employeeType = employeeTypeList;
      },
      (error)=>{
        console.log('Error al obtener la lista de departamentos:', error);
      }
  )
}

loadWorkPositionByEmployeeType(idEmployeeType : number) {
  this._employeeService.getWorkpositionByEmployees(idEmployeeType).subscribe(
    (workPositions) =>{
      this.workPosition = workPositions;
      console.log(workPositions)
      console.log('ee', this.workPosition)
    },
    (error) => {
      console.error('Error al obtener la lista de cargos:', error);
    }
  );
}

onEmployeesTypeSelected(event: any){
  const selectedEmployeeTypeId = event.target.value;
  if (selectedEmployeeTypeId !== undefined  && selectedEmployeeTypeId !== null){
    this.loadWorkPositionByEmployeeType(selectedEmployeeTypeId);
  }
}

// Carga la lista de departamentos desde el servicio.
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

// Carga la lista de municipios por departamento desde el servicio.
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

// Maneja la selección de un departamento en el formulario.
onDepartmentSelected(event: any) {
  const selectedDepartmentID = event.target.value;
  console.log('Selected Department ID:', selectedDepartmentID);

  if (selectedDepartmentID !== undefined && selectedDepartmentID !== null) {
    // Llama a la función para cargar los municipios por departamento.
    this.loadMunicipalitiesByDepartment(selectedDepartmentID);
  }
}


  createEmployee() {}
}
