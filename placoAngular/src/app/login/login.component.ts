import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {
  fb = inject(FormBuilder);
  // http = inject(HttpClient);
  router = inject(Router);
  authService = inject(AuthService);

  form = this.fb.nonNullable.group({
    correo: ['', Validators.required],
    contra: ['', Validators.required],
  });

  //validar login
  onSubmit(): void {
    const rawForm = this.form.getRawValue();
    this.authService.login(rawForm.correo, rawForm.contra).subscribe({
      next: () => {
        Swal.fire({
          title: 'Bienvenido',
          text: 'Inicio de sesión exitoso',
          icon: 'success',
          confirmButtonText: 'OK'
        }).then(() => {
          this.router.navigateByUrl('/home');
        });
      },
      error: (err) => {
        Swal.fire({
          title: 'Error',
          text: 'Contraseña y/o correo incorrectos',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
    });
  }

  goToRegistro() {
    this.router.navigate(['/registro']);
  }

  goToLoginTel(){
    this.router.navigate(['/login-tel']);
  }
}