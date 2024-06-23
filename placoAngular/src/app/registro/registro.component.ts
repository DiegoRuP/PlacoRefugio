import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

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
    alert("Usuario registrado");
    const rawForm = this.form.getRawValue();
    this.authService.registrar(rawForm.correo, rawForm.usuario, rawForm.contra, rawForm.telefono)
      .subscribe(() => this.router.navigateByUrl('/home'));
  }
}