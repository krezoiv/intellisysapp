import { Component } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators,} from '@angular/forms';
import { CampusModel } from 'src/app/data/models/campus.models';
import { DepartmetsModel } from 'src/app/data/models/department.model';
import { EmployeeTypeModel } from 'src/app/data/models/employee-type';
import { EmployeesModel } from 'src/app/data/models/employees.model';
import { MunicipalityModel } from 'src/app/data/models/municipality.models';
import { WorkPositionModel } from 'src/app/data/models/work-position.models';
import { EmployeesService } from 'src/app/services/employees.service';
import { LocationService } from 'src/app/services/location.service';
import { WorkPositionService } from 'src/app/services/work-position.service';
import { ToastrService } from 'ngx-toastr'; // Importa ToastrService
import Swal from 'sweetalert2';
import { EmployeeFormInterface } from 'src/app/data/interfaces/employee-form.interfaces';

@Component({
  selector: 'app-new-employee',
  templateUrl: './new-employee.component.html',
  styleUrls: ['./new-employee.component.css'],
})
export class NewEmployeeComponent {
  public formSubmitted = false;
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

  public employeeForm: FormGroup = this.fb.group({
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

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private _locationService: LocationService,
    private _employeeService: EmployeesService,
    private _workPositionService: WorkPositionService
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
    const selectedEmployeeTypeId = event.target.value;
    if (
      selectedEmployeeTypeId !== undefined &&
      selectedEmployeeTypeId !== null
    ) {
      this.loadWorkPositionByEmployeeType(selectedEmployeeTypeId);
      this.employeeForm.patchValue({ idWorkPosition: '' }); // Esto inicializará el campo a vacío
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

 /*createEmployee() {
    this.formSubmitted = true;

    if (this.employeeForm.invalid) {
      this.toastr.info('Faltan Campos por llenar', 'Alerta');
      return;
    }

    this._employeeService.createEmployee(this.employeeForm.value).subscribe(
      (response: any) => {
        this.toastr.success('Empleado creado con éxito', 'Éxito');
        this.employeeForm.reset();
      },
      (error: any) => {
        console.error('Error al crear el empleado:', error);
        this.toastr.error(
          'Error al crear el empleado. Por favor, inténtelo de nuevo.',
          'Error'
        );
      }
    );
  }*/

  createEmployee(){
    this._employeeService.createEmployee(this.employeeForm.value).subscribe(
      (data : any) =>{
        if (data.message) {
          // Comprobar si la respuesta contiene un mensaje de éxito
          const successMessage = data.message;
          
          // Muestra el mensaje de éxito utilizando Toastr
          this.toastr.success(successMessage, 'Éxito');
          this.employeeForm.reset();
          
          // Puedes realizar cualquier otra acción después de un éxito aquí
        } else {
          // Si la respuesta no contiene un mensaje de éxito, muestra un mensaje genérico
          this.toastr.error('Error inesperado, intente de nuevo', 'Error');
        }
      },
      (err) => {
        this.toastr.error(err.error.error || 'Error inesperado, intente de nuevo', 'Error');
      }
    )
  }
}
