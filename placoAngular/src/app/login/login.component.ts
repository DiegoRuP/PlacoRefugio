import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

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

  onSubmit(): void {
    alert("Bienvenido");
    const rawForm = this.form.getRawValue();
    this.authService.login(rawForm.correo, rawForm.contra)
      .subscribe(() => this.router.navigateByUrl('/home'));
  }

  goToRegistro() {
    this.router.navigate(['/registro']);
  }

  goToLoginTel(){
    this.router.navigate(['/login-tel']);
  }
}