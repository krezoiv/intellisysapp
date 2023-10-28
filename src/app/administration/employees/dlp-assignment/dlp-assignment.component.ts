import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { EmployeesModel } from 'src/app/data/models/employees.model';
import { EmployeesService } from 'src/app/services/employees.service';


@Component({
  selector: 'app-dlp-assignment',
  templateUrl: './dlp-assignment.component.html',
  styleUrls: ['./dlp-assignment.component.css']
})
export class DlpAssignmentComponent {
  public employee : EmployeesModel[]=[];

  public dlpAssignmetForm : FormGroup = this.fb.group({
    code : ['EARA2', Validators.required],
    idEmployee : ['', Validators.required],
    firstName : ['', Validators.required],
    firstLastName : ['', Validators.required],
    campusName : ['', Validators.required],
    workPosition : ['', Validators.required],
    idRoute : ['', Validators.required],
    

  })

  constructor(
    private toastr: ToastrService,
    private fb : FormBuilder,
    private _employeeService : EmployeesService
  ){}

  ngOnInit(): void {
    
  }

  getData(){
    const code = this.dlpAssignmetForm!.get("code")!.value;
    this._employeeService.sesarchEmployeeRoutes(code).subscribe(
      (response) => {
        console.log(response)
      }
    )
  }

  saveDlpAssignment(){
    this.getData();
  }


}