import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-correo',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './correo.component.html',
  styleUrl: './correo.component.css'
})
export class CorreoComponent {
  

  nombre: string = '';
  apellido: string = '';
  email: string = '';
  telefono: string = '';
  mensaje: string = '';

  constructor(private http: HttpClient) {}

  onSubmit() {
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
