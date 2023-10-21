import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import jwt_decode from 'jwt-decode';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';
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
  constructor(private _http: HttpClient) { }

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
    return this._http
      .get<WorkPositionModel[]>(`${API_URL}/workPosition`, this.headers)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 401) {
            console.error('Error de autorización:', error.message);
            return throwError(
              'Error de autorización: Redirigiendo a la página de inicio de sesión.'
            );
          } else {
            // Maneja otros errores de manera genérica.
            console.error(
              'Error en la solicitud de posición de trabajo:',
              error
            );
            return throwError(
              'No se pudo obtener la lista de posición de trabajo. Por favor, inténtelo de nuevo.'
            );
          }
        })
      );
  }

  getEmployeesTypeList(): Observable<EmployeeTypeModel[]> {
    return this._http
      .get<EmployeeTypeModel[]>(`${API_URL}/employeeType`, this.headers)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 401) {
            // Maneja errores de autorización, por ejemplo, redirigiendo a la página de inicio de sesión.
            console.error('Error de autorización:', error.message);
            return throwError(
              'Error de autorización: Redirigiendo a la página de inicio de sesión.'
            );
          } else {
            // Maneja otros errores de manera genérica.
            console.error('Error en la solicitud de departamentos:', error);
            return throwError(
              'No se pudo obtener la lista de tipo de empleados. Por favor, inténtelo de nuevo.'
            );
          }
        })
      );
  }

  getWorkpositionByEmployees(idEmployeeType : number): Observable<WorkPositionModel[]>{
    return this._http.get<WorkPositionModel[]>(`${API_URL}/workPositions/${idEmployeeType}`, this.headers)
    .pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          // Maneja errores de autorización, por ejemplo, redirigiendo a la página de inicio de sesión.
          console.error('Error de autorización:', error.message);
          return throwError('Error de autorización: Redirigiendo a la página de inicio de sesión.');
        } else {
          // Maneja otros errores de manera genérica.
          console.error('Error en la solicitud de cargos:', error);
          return throwError('No se pudo obtener la lista de cargos. Por favor, inténtelo de nuevo.');
        }
      })
    );
  }

  /**
   * Método para crear un nuevo empleado en el servidor.
   * @param employeeData - Datos del nuevo empleado a crear.
   * @returns {Observable<EmployeeModel>} - Un observable que emite el nuevo empleado creado.
   */
  createEmployee(employeeData: EmployeesModel): Observable<EmployeesModel> {
    return this._http.post<EmployeesModel>(`${API_URL}/employees`, employeeData, this.headers)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 401) {
            console.error('Error de autorización:', error.message);
            return throwError('Error de autorización: Redirigiendo a la página de inicio de sesión.');
          } else {
            console.error('Error al crear un nuevo empleado:', error);
            return throwError('No se pudo crear el nuevo empleado. Por favor, inténtelo de nuevo.');
          }
        })
      );
  }
}
