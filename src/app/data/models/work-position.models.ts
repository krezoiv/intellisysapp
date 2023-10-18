import { EmployeeTypeModel } from "./employee-type";

export class WorkPositionModel{
    constructor(
      public idWorkposition : number,
      public workPosition: string,
      public idEmployeeType: EmployeeTypeModel
    ){
  
    }
  }
  