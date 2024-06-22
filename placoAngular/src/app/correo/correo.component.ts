import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { FormControl,FormGroup,ReactiveFormsModule,Validators } from '@angular/forms';

@Component({
  selector: 'app-correo',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './correo.component.html',
  styleUrl: './correo.component.css'
})
export class CorreoComponent {
  

  nombre: string = '';
  apellido: string = '';
  email: string = '';
  telefono: string = '';
  mensaje: string = '';

  resultado!: string;

  formularioContacto = new FormGroup({
    nombre: new FormControl('', [Validators.required, Validators.minLength(3)]),
    apellido: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    mensaje: new FormControl('', [Validators.required, Validators.maxLength(500)]),
    telefono: new FormControl('', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")])
  });

  constructor(private http: HttpClient) {}

  onSubmit() {
    if(this.formularioContacto.valid)
      this.resultado = "Todos los datos son validos";
    else
      this.resultado = "Hay datos invalidos en el formulario";
    const cuerpoCorreo = `        
        Hola ${this.nombre} ${this.apellido},
        Gracias por tu mensaje:\n
        "- ${this.mensaje}"\n
        Nos pondremos en contacto contigo lo más pronto posible.
        Saludos cordiales,
        Tu equipo PlacoRefugio`;

    const correo = {
      to: this.email,
      subject: 'Mensaje desde formulario de contacto',
      text: cuerpoCorreo
    };

    this.http.post('http://localhost:3000/correo', correo)
      .subscribe(
        response => {
          console.log('Email enviado', response);
        },
        error => {
          console.error('Error al enviar el correo', error);
        }
      );
  }

}
