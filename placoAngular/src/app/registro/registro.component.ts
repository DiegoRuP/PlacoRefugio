import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})

export class RegistroComponent {
  fb = inject(FormBuilder);
  // http = inject(HttpClient);
  authService = inject(AuthService);
  router = inject(Router);

  form = this.fb.nonNullable.group({
    usuario: ['', Validators.required],
    correo: ['', Validators.required],
    contra: ['', Validators.required],
    telefono: ['', [Validators.required, Validators.pattern('^\\+?[1-9]\\d{1,14}$')]],
  });

  onSubmit(): void {
    const rawForm = this.form.getRawValue();
    this.authService.registrar(rawForm.correo, rawForm.usuario, rawForm.contra, rawForm.telefono).subscribe({
      next: () => {
        Swal.fire({
          title: 'Usuario registrado',
          text: 'El registro fue exitoso.',
          icon: 'success',
          confirmButtonText: 'OK'
        }).then(() => {
          this.router.navigateByUrl('/home');
        });
      },
      error: (err) => {
        Swal.fire({
          title: 'Error',
          text: 'Error al registrar',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
    });
  }
}