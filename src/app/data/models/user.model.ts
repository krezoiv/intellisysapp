import { EmployeesModel } from "./employees.model";
import { RoleModel } from "./role.model";
import { StatusModel } from "./status.models";


export class UserModel {
    constructor(
        public idUser: number,
        public userName : string,
        public password : string,
        public idRole: RoleModel,
        public idStatus: StatusModel,
        public idEmployee : EmployeesModel,
        public code : string
    ){}
}