import { HttpClient,HttpHeaders} from '@angular/common/http';
import jwt_decode from 'jwt-decode';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

import { Observable, catchError, throwError } from 'rxjs';
import { WorkPositionModel } from '../data/models/work-position.models';
import { EmployeeTypeModel } from '../data/models/employee-type';
import { EmployeesModel } from '../data/models/employees.model';

const API_URL = environment.API_URL;

/**
 * Interfaz DecodedToken
 *
 * Esta interfaz define la estructura esperada de un objeto que representa un token decodificado.
 * Contiene la propiedad 'exp' que representa la fecha de vencimiento del token.
 * Puedes agregar otras propiedades necesarias para representar información adicional del token.
 */
interface DecodedToken {
  exp: number; // Representa la fecha de vencimiento del token en forma de marca de tiempo.
  // Agrega otras propiedades aquí si es necesario para representar información adicional del token.
}

@Injectable({
  providedIn: 'root',
})
export class EmployeesService {
  constructor(private _http: HttpClient) {}

  // Función para decodificar un token JWT
  decodeToken(token: string) {
    try {
      const decodedToken = jwt_decode(token);
      return decodedToken;
    } catch (error) {
      // Si hay un error al decodificar el token, registra el error y devuelve null
      console.error('Error al decodificar el token:', error);
      return null;
    }
  }
  // Función para obtener información del token almacenado en el localStorage
  getTokenInfo() {
    const token = localStorage.getItem('token'); // Obtén el token desde el localStorage

    if (!token) {
      return null; // Si no hay un token en el localStorage, devuelve null
    }

    const decodedToken: DecodedToken = jwt_decode(token); // Decodifica el token

    if (!decodedToken || !decodedToken.exp) {
      return null; // Si el token no se pudo decodificar o no contiene la propiedad 'exp', devuelve null
    }

    // Calcula la fecha de expiración sumando 5 minutos a la hora actual
    const expirationDate = new Date();
    expirationDate.setMinutes(expirationDate.getMinutes() + 5);

    return {
      token,
      expirationDate,
    };
  }

  get headers() {
    const tokenInfo = this.getTokenInfo();
    const headers = new HttpHeaders({
      jwt: tokenInfo?.token || '',
    });
    return {
      headers: headers,
    };
  }

  /**
   * Método para obtener una lista de posiciones de trabajo desde el servidor.
   * @returns {Observable<WorkPositionModel[]>} - Un observable que emite una lista de posiciones de trabajo.
   */
  getWorkList(): Observable<WorkPositionModel[]> {
    return this._http.get<WorkPositionModel[]>(
      `${API_URL}/workPosition`,
      this.headers
    );
  }

  getEmployeesTypeList(): Observable<EmployeeTypeModel[]> {
    return this._http.get<EmployeeTypeModel[]>(
      `${API_URL}/employeeType`,
      this.headers
    );
  }

  getWorkpositionByEmployees(
    idEmployeeType: number
  ): Observable<WorkPositionModel[]> {
    return this._http.get<WorkPositionModel[]>(
      `${API_URL}/workPositions/${idEmployeeType}`,
      this.headers
    );
  }

  /**
   * Método para crear un nuevo empleado en el servidor.
   * @param employeeData - Datos del nuevo empleado a crear.
   * @returns {Observable<EmployeeModel>} - Un observable que emite el nuevo empleado creado.
   */
  createEmployee(employeeData: EmployeesModel): Observable<EmployeesModel> {
    return this._http.post<EmployeesModel>(
      `${API_URL}/employees`,
      employeeData,
      this.headers
    );
  }

  /**
   * Método para buscar empleados en el servidor que coincidan con un término de búsqueda.
   * @param searchTerm - Término de búsqueda para buscar empleados.
   * @returns {Observable<EmployeesModel[]>} - Un observable que emite la lista de empleados que coinciden con el término de búsqueda.
   */
  searchEmployee(searchTerm: string): Observable<EmployeesModel[]> {
    const requestBody = { searchTerm };
    return this._http.post<EmployeesModel[]>(
      `${API_URL}/searchEmployee`,
      requestBody,
      this.headers
    );
  }

  getEmployeeDetails(): Observable<EmployeesModel[]>{
    return this._http.get<EmployeesModel[]>(`${API_URL}/employees`, this.headers);
  }
}
