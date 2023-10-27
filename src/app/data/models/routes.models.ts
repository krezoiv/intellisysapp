import { CampusModel } from "./campus.models";

export class RouteModel {
    constructor(
        public idRoute: number,
        public routeName : string,
        public idCampus : CampusModel
    ){}
}