import { Injectable, HostListener } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {LoginFormInterface,LoginResponse } from '../data/interfaces/login-form.interfaces';

import { Observable, of, throwError } from 'rxjs'; // Importa throwError
import { catchError, map } from 'rxjs/operators'; // Importa catchError
import { tap } from 'rxjs/operators';
import jwt_decode from 'jwt-decode';
import Swal from 'sweetalert2';
import { environment } from 'src/environments/environment';

interface DecodedToken {
  exp: number;
  userName: string;
  // Agrega otras propiedades del token si las necesitas
}

// Obtiene la URL de la API desde el archivo environment
const API_URL = environment.API_URL

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private inactivityTimer: any;
  constructor(private http: HttpClient) {}

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


    const userName = decodedToken.userName;
    return {
      token,
      expirationDate,
      userName
    };
  }

  /**
   * Valida un token de autenticación almacenado en el `localStorage` del navegador
   * realizando una solicitud HTTP GET al servidor.
   *
   * @returns Un Observable que emite un valor booleano. True si la validación fue exitosa, false si falló.
   * @throws {Observable<boolean>} Un Observable que representa el resultado de la validación.
   */
  _validateToken(): Observable<boolean> {
    const token = localStorage.getItem('token') || '';

    return this.http
      .get(`${API_URL}/login/renewtoken`, {
        headers: {
          jwt: token,
        },
      })
      .pipe(
        tap({
          next: (respPipe: any) => {
            localStorage.setItem('token', respPipe.token);
          },
          error: (error) => {
            // Manejar errores de la solicitud aquí (por ejemplo, mostrar un mensaje de error)
            console.error('Error al validar el token:', error);
          },
        }),
        map(() => true),
        catchError(() => of(false))
      );
  }

  /**
   * Realiza una solicitud HTTP POST para iniciar sesión.
   * @param formData Los datos del formulario de inicio de sesión.
   * @returns Un Observable que contiene la respuesta del servidor.
   * @throws {Observable<LoginResponse>} Un Observable que representa la respuesta del servidor.
   */

  login(formData: LoginFormInterface): Observable<LoginResponse> {
    return this.http
      .post<LoginResponse>(`${API_URL}/login`, formData)
      .pipe(
        catchError((error: any) => {
          let errorMessage = 'Ha ocurrido un error al iniciar sesión'; // Mensaje de error predeterminado

          if (error instanceof Error) {
            // Si el error es una instancia de Error, podemos acceder a su propiedad 'message'
            errorMessage = error.message;
          } else if (error && error.error && typeof error.error === 'string') {
            // Si el error tiene una propiedad 'error' que es una cadena, la usamos como mensaje de error
            errorMessage = error.error;
          }

          // Lanza un nuevo observable con el error personalizado
          return throwError(errorMessage);
        })
      )
      .pipe(
        // Después de recibir una respuesta exitosa, extrae el token y guárdalo en el localStorage
        tap((resp: any) => {
          localStorage.setItem('token', resp.token);
        })
      );
  }

  // Función para borrar el token del localStorage
  private clearToken() {
    localStorage.removeItem('token');
  }

  // Función para restablecer el temporizador de inactividad y mostrar una alerta
  private resetInactivityTimer() {
    clearTimeout(this.inactivityTimer);

    // Reducir el tiempo de advertencia a 4 minutos (240000 milisegundos)
    const warningTime = 300000; // 5 minutos en milisegundos

    this.inactivityTimer = setTimeout(() => {
      // Mostrar Sweet Alert para advertir al usuario
      Swal.fire({
        title: 'Advertencia',
        text: 'Su sesión está a punto de vencer. ¿Desea continuar?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí',
        cancelButtonText: 'No',
        timer: 120000, // 2 minutos para que la alerta desaparezca automáticamente
      }).then((result) => {
        if (result.isConfirmed) {
          // El usuario eligió continuar, puedes realizar alguna acción si es necesario
          this._validateToken().subscribe((success) => {
            if (success) {
              // Renovar el token (agregar lógica adicional si es necesario)
              localStorage.setItem('token', 'nuevoToken'); // Actualiza el token en el localStorage
              this.resetInactivityTimer(); // Reiniciar el temporizador
            } else {
              // La renovación del token falló, muestra un mensaje de error y limpia el token
              console.error('La renovación del token falló.');
              this.clearToken();
            }
          });
        } else {
          // El usuario eligió no continuar, no hagas nada
        }
      });
    }, warningTime);

    // Restablecer el temporizador de cierre de sesión completo a 8 horas (28800000 milisegundos)
    const logoutTime = 28800000; // 8 horas en milisegundos
    setTimeout(() => {
      this.clearToken();
    }, logoutTime);
  }

  // Esta función se llama cada vez que el usuario interactúa con la aplicación
  userActivityDetected() {
    this.resetInactivityTimer();
  }

  // Función para manejar la interacción del usuario (se ejecutará en cada clic)
  @HostListener('document:click', ['$event'])
  onUserInteraction(event: Event) {
    // Llama a la función de seguimiento de actividad del servicio de autenticación
    this.userActivityDetected();
  }
}
