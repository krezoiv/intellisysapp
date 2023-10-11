/**
 * Archivo de configuración de entorno para la aplicación Angular.
 *
 * Este archivo define variables de entorno específicas para el entorno de desarrollo.
 * Puedes acceder a estas variables en toda la aplicación utilizando 'environment'.
 *
 * Propiedades:
 * - production: Indica si la aplicación se ejecuta en modo de producción (true) o desarrollo (false).
 * - API_URL: URL base para la API de la aplicación en el entorno de desarrollo.
 *
 * Ejemplo de uso:
 * ```
 * import { environment } from './environment';
 * console.log(environment.production); // false
 * console.log(environment.API_URL); // 'http://localhost:3000/'
 * ```
 */
export const environment = {
  production: false,
  API_URL: 'http://localhost:3000'
};
