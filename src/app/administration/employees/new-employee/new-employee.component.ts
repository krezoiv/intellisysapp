import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { campusInterface } from 'src/app/data/interfaces/campus.interfaces.';
import { CampusModel } from 'src/app/data/models/campus.models';
import { CampusService } from 'src/app/services/campus.service';

@Component({
  selector: 'app-new-employee',
  templateUrl: './new-employee.component.html',
  styleUrls: ['./new-employee.component.css']
})
export class NewEmployeeComponent {

  public campus : CampusModel[]=[];

  public employeeForm : FormGroup = this.fb.group({
    code :[''],
    firstName :[''],
    secondName :[''],
    firstLastName :[''],
    secondLastName :[''],
    hireDate :[''],
    idCampus :[''],
    idEmployeeType:[''],
    idStatus: [''],
    idWorkPosition :[''],
    idMunicipality:[''],
    addressReference:[''],
    BACaccount :[''],
    BAMaccount :[''], 
  })

  constructor(
    private fb: FormBuilder,
    private _campusService : CampusService
  ){}

  
  ngOnInit(): void {
    // Cuando el componente se inicializa, carga la lista de campus.
    this.loadCampus();
  }

  /**
   * Carga la lista de campus desde el servicio.
   */
  loadCampus() {
    this._campusService.getAllCampus().subscribe(
      (data: campusInterface) => {   
        // Maneja la respuesta exitosa y almacena la lista de campus.
        this.campus = data.campus;
        console.log('Respuesta de la solicitud:', data);
      },
      (error) => {
        // Maneja errores en la solicitud y muestra mensajes de error en la consola.
        console.error('Error al obtener la lista de campus:', error);
      }
    );
  }
  
  

  createEmployee(){}

  
  
}
