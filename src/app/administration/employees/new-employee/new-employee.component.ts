import { Component } from '@angular/core';
import { format } from 'date-fns'

import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';
import { formatDate } from '@angular/common';
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
import { Router } from '@angular/router';

const onlyChar = /^[a-zA-ZñÑ]+( [a-zA-ZñÑ]+)*$/;
const onlyNumber = /^[0-9]+$/;

@Component({
  selector: 'app-new-employee',
  templateUrl: './new-employee.component.html',
  styleUrls: ['./new-employee.component.css'],
})
export class NewEmployeeComponent {
  public currentDate: Date = new Date();
  public maxDate = format(this.currentDate, 'yyyy-MM-dd HH:mm:ss');;

  public fieldsErrorMessages = {
    patternRequired: '*El campo es obligatorio y debe contener solo caracteres alfabéticos sin tíldes',
    required: '*Campo requerido',
    onlyNumber: '*Campo solo debe contener núnmeros sin espacios',
    dpi: '*campo es obligatorio, debe de ser numérico de 13 digitos',
    patternNotRequired : '*El campo debe contener solo caracteres alfabéticos sin tíldes',
  };
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
    code: [''],
    firstName: ['', [Validators.required, Validators.pattern(onlyChar)]],
    secondName: ['', [Validators.pattern(onlyChar)]],
    firstLastName: ['', [Validators.required, Validators.pattern(onlyChar)]],
    secondLastName: ['', [Validators.pattern(onlyChar)]],
    hireDate: ['', Validators.required],
    idCampus: ['', Validators.required],
    idEmployeeType: ['', Validators.required],
    idStatus: [1],
    idWorkposition: ['', Validators.required],
    idDepartment: ['', Validators.required],
    idMunicipality: ['', Validators.required],
    addressReference: ['', Validators.required],
    BACaccount: ['', [Validators.pattern(onlyNumber)]],
    BAMaccount: ['', [Validators.pattern(onlyNumber)]],
    dpi: ['', [Validators.required, Validators.pattern(onlyNumber), Validators.maxLength(13),Validators.minLength(13),
      ],
    ],
  });

  constructor(
    private router: Router,
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

  isValidField(field: string) {
    return (
      this.employeeForm.controls[field].errors &&
      this.employeeForm.controls[field].touched
    );
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
    const selectedEmployeeTypeId = event.value;
    if (
      selectedEmployeeTypeId !== undefined &&
      selectedEmployeeTypeId !== null
    ) {
      this.loadWorkPositionByEmployeeType(selectedEmployeeTypeId);
      this.employeeForm.patchValue({ idWorkposition: '' }); // Esto inicializará el campo a vacío
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

  onDepartmentSelected(event: any) {
    const selectedDepartmentID = event.value; // Utiliza event.value para obtener el valor seleccionado
    console.log('Selected Department ID:', selectedDepartmentID);

    if (selectedDepartmentID !== undefined && selectedDepartmentID !== null) {
      // Llama a la función para cargar los municipios por departamento.
      this.loadMunicipalitiesByDepartment(selectedDepartmentID);
    }
  }

  createEmployee() {
    if (this.employeeForm.valid) {
      const firstName = this.employeeForm!.get('firstName')!.value;
      const firstLastName = this.employeeForm!.get('firstLastName')!.value;
     
      // Verificar si los campos BACaccount y BAMaccount están vacíos y asignar valor 0 si es necesario
      if (this.employeeForm.value.BACaccount === '') {
        this.employeeForm.patchValue({ BACaccount: 0 });
      }
      if (this.employeeForm.value.BAMaccount === '') {
        this.employeeForm.patchValue({ BAMaccount: 0 });
      }

      Swal.fire({
        title: `¿Estás seguro de guardar a <strong>${firstName}</strong> <strong>${firstLastName}</strong>?`,
        text: '!! Confirmar !!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí',
        cancelButtonText: 'No',
      }).then((result) => {
        if (result.isConfirmed) {
          this._employeeService
            .createEmployee(this.employeeForm.value)
            .subscribe(
              (data: any) => {
                if (data.message) {
                  // Comprobar si la respuesta contiene un mensaje de éxito
                 
                  if (
                    !this.employeeForm.value.BAMaccount ||
                    !this.employeeForm.value.BACaccount
                  ) {
                    Swal.fire({
                      title: 'No se ha ingresado número de cuenta bancaria',
                      text: 'Por favor, gestionar aperturas de cuentas.',
                      icon: 'warning',
                    });
                  }

                  const successMessage = data.message;
                  // Muestra el mensaje de éxito utilizando Toastr
                  this.toastr.success(successMessage, 'Éxito');
                  this.employeeForm.reset();
                 
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
                this.toastr.error(
                  err.error.error || 'Error inesperado, intente de nuevo',
                  'Error'
                );
                
              }
             
            );
        }
      });
    } else {
      Swal.fire({
        title: 'Error',
        text: 'Por favor, complete todos los campos requeridos antes de guardar.',
        icon: 'warning',
      });
    }
  }

  reloadPage() {
    location.reload();
  }
}
