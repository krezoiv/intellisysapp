import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { RoleModel } from '../data/models/role.model';
import { Observable } from 'rxjs';

const API_URL = environment.API_URL;

@Injectable({
  providedIn: 'root'
})
export class RolesService {

  constructor(
    private _http : HttpClient
  ) { }


  createRole(roleData : RoleModel): Observable<RoleModel[]>{
    return this._http.post<RoleModel[]>(`${API_URL}/roles`, roleData)
  }
}
