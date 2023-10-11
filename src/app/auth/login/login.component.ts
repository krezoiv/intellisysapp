import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2'; // Importa SweetAlert2
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { LoginFormInterface } from '../../data/interfaces/login-form.interfaces';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  public formSubmitted = false;

  public loginForm = this.fb.group({
    userName: ['', Validators.required],
    password: ['', Validators.required],
  });

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthService
  ) {}
  login() {
    this.formSubmitted = true;
  
    if (this.loginForm.invalid) {
      return;
    }
  
    const formData: LoginFormInterface = this.loginForm.value as LoginFormInterface;
  
    this.authService.login(formData).subscribe(
      (response) => {
        console.log(response);
  
        // Mostrar SweetAlert personalizado
        Swal.fire({
          icon: 'success',
          title: 'Inicio de sesión exitoso',
          position: 'top-end', // Posición en la parte superior derecha
          showConfirmButton: false, // No mostrar botón de confirmación
          timer: 1000 // Temporizador de 2 segundos
        }).then((result) => {
          if (result.dismiss === Swal.DismissReason.timer) {
            // Redirigir al usuario a la página de inicio después del inicio de sesión exitoso
            this.router.navigate(['/dashboard']);
          }
        });
      },
      (error) => {
        console.error(error);
  
        // Mostrar SweetAlert personalizado para error
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: error.error || 'Ha ocurrido un error al iniciar sesión',
          position: 'top-end', // Posición en la parte superior derecha
          showConfirmButton: false, // No mostrar botón de confirmación
          timer: 2000 // Temporizador de 2 segundos
        });
      }
    );
  }
}