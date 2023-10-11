
/**
 * Interfaz que representa la estructura de un formulario de inicio de sesión.
 * Esta interfaz se utiliza para definir la estructura de datos esperada en un formulario
 * de inicio de sesión en la aplicación Angular.
 */
export interface LoginFormInterface {
    /**
     * El nombre de usuario del usuario que está intentando iniciar sesión.
     * Debe ser una cadena de caracteres.
     */
    usuario: string;
  
    /**
     * La contraseña del usuario que está intentando iniciar sesión.
     * Debe ser una cadena de caracteres.
     */
    password: string;
  }
  
  
  export interface LoginResponse {
    success: boolean; 
    message: string;  
   
  }