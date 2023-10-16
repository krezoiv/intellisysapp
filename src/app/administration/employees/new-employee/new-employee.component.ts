import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { CampusModel } from 'src/app/data/models/campus.models';
import { WorkPositionModel } from 'src/app/data/models/work-position.models';
import { CampusService } from 'src/app/services/campus.service';
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


  public employeeForm: FormGroup = this.fb.group({
    code: [''],
    firstName: [''],
    secondName: [''],
    firstLastName: [''],
    secondLastName: [''],
    hireDate: [''],
    idCampus: [''],
    idEmployeeType: [''],
    idStatus: [''],
    idWorkPosition: [''],
    idMunicipality: [''],
    addressReference: [''],
    BACaccount: [''],
    BAMaccount: [''],
  });

  constructor(
    private fb: FormBuilder, 
    private _campusService: CampusService,
    private _workPositionService : WorkPositionService
    ) {}

  ngOnInit(): void {
    this.loadCampus();
    this.loadWorkPosition()
  }

  /*
  loadCampus(){
    this._campusService.getCampusList().subscribe((campusList) => {
      this.campus = campusList;

    });
  }
*/

  /**
   * Carga la lista de campus desde el servicio.
   */
  loadCampus() {
    this._campusService.getCampusList().subscribe(
      (campusList) => {
        // Maneja la respuesta exitosa y almacena la lista de campus.
        this.campus = campusList;
        // console.log('Respuesta de la solicitud:', data);
      },
      (error) => {
        // Maneja errores en la solicitud y muestra mensajes de error en la consola.
        console.error('Error al obtener la lista de campus:', error);
      }
    );
  }

 /**
 * Método para cargar la lista de posiciones de trabajo desde el servidor y almacenarla en la propiedad 'workPosition'.
 */
loadWorkPosition() {
  this._workPositionService.getWorkList().subscribe(
      (workPositionList) => {
          this.workPosition = workPositionList;
      },
      (error) => {
          console.error('Error al obtener la lista de puestos:', error);
      }
  );
}


  createEmployee() {}
}
