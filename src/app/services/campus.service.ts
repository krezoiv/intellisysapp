import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import jwt_decode from 'jwt-decode';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { campusInterface } from '../data/interfaces/campus.interfaces.';

const API_URL = environment.API_URL

interface DecodedToken {
  exp: number;
  // Agrega otras propiedades del token si las necesitas
}


@Injectable({
  providedIn: 'root'
})
export class CampusService {

  constructor(
    private _http : HttpClient
  ) { }

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

get headers(){
  const tokenInfo = this.getTokenInfo();
  const headers = new HttpHeaders({
    'jwt': tokenInfo?.token || ''
  });
  return {
    headers: headers
  };
}
/**
 * Obtiene la lista de campus a través de una solicitud HTTP.
 * @returns Un Observable que emite datos de tipo 'campusInterface' o maneja errores.
 */
getAllCampus(): Observable<campusInterface> {
  return this._http.get<campusInterface>(`${API_URL}/campus`, this.headers)
    .pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          // Maneja errores de autorización, por ejemplo, redirigiendo a la página de inicio de sesión.
          console.error('Error de autorización:', error.message);
          return throwError('Error de autorización: Redirigiendo a la página de inicio de sesión.');
        } else {
          // Maneja otros errores de manera genérica.
          console.error('Error en la solicitud de campus:', error);
          return throwError('No se pudo obtener la lista de campus. Por favor, inténtelo de nuevo.');
        }
      })
    );
}

}