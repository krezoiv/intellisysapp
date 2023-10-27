import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import jwt_decode from 'jwt-decode';
import { RouteModel } from '../data/models/routes.models';
import { Observable } from 'rxjs';

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
export class RoutesService {
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

  createRoute(routeData: RouteModel): Observable<RouteModel[]> {
    return this._http.post<RouteModel[]>(
      `${API_URL}/route`,
      routeData,
      this.headers
    );
  }
}
