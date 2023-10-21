

export interface  EmployeeFormInterface {
    code: string,
    firstName: string,
    secondName: string,
    firstLastName: string,
    secondLastName: string,
    hireDate: string,
    idCampus: string,
    idEmployeeType: string,
    idStatus: number,
    idWorkPosition: number,
    idDepartment: number,
    idMunicipality: number,
    addressReference: string,
    BACaccount: string,
    BAMaccount: string,
} 

export interface LoginResponse {
    success: boolean; 
    message: string;  
   
  }