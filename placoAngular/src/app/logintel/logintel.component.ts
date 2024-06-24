import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-logintel',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './logintel.component.html',
  styleUrl: './logintel.component.css'
})

export class LogintelComponent {
  fb = inject(FormBuilder);
  // http = inject(HttpClient);
  router = inject(Router);
  authService = inject(AuthService);
  phone: string="";
  codigo: string="";
  validado: boolean=false;

  onSubmit(captcha:HTMLButtonElement): void {
    //const rawForm = this.form.getRawValue();
    /*this.authService.login(rawForm.correo, rawForm.contra)
      .subscribe(() => this.router.navigateByUrl('/'));*/
    this.authService.sendSMS('+52'+this.phone,captcha,(validado)=>{
      this.validado=validado;
    })
  }

  confirmarSMS(){
    console.log(this.codigo)
    this.authService.phoneConfirmationCode(this.codigo,(validado)=>{
      if(validado){
        Swal.fire({
          title: 'Bienvenido',
          text: 'Inicio de sesión exitoso',
          icon: 'success',
          confirmButtonText: 'OK'
        }).then(() => {
          this.router.navigateByUrl('/');
        });
      }else {
        Swal.fire({
          title: 'Error',
          text: 'Código SMS incorrecto',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
    });
  }

  goToRegistro(){
    this.router.navigate(['/registro']);
  }
}