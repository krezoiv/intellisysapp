import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-new-employee',
  templateUrl: './new-employee.component.html',
  styleUrls: ['./new-employee.component.css']
})
export class NewEmployeeComponent {

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
    private fb: FormBuilder
  ){}

  
}
