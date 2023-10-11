/**
 * Archivo de configuración de entorno para la aplicación Angular en modo de producción.
 *
 * Este archivo define variables de entorno específicas para el entorno de producción.
 * Puedes acceder a estas variables en toda la aplicación utilizando 'environment'.
 *
 * Propiedades:
 * - production: Indica si la aplicación se ejecuta en modo de producción (true).
 * - API_URL: URL base para la API de la aplicación en el entorno de producción.
 *
 * Ejemplo de uso:
 * ```
 * import { environment } from './environment.prod';
 * console.log(environment.production); // true
 * console.log(environment.API_URL); // 'http://54.125.123.11:3000/'
 * ```
 */
export const environment = {
    production: true,
    //TODO: se debe de cambiar el URL con la IP correcta
    API_URL: 'http://localhost:3000'
  };