import { DepartmetsModel } from "./department.model";


export class MunicipalityModel {
    constructor(
      public idMunicipality : number,
      public idDepartment : DepartmetsModel,
      public municipality: string,
          ){}
};

