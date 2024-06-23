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

  //Validator personalizado para telefono
  telefonoValidator(control: FormControl): { [s: string]: boolean } | null {
    const valor = control.value; //Se obtiene lo que esta en el formulario
    //En esta linea se especifica el formato o patron que queremos
    const valido = /^((\+91-?)|0)?[0-9]{10}$/.test(valor);
    //Retorna si es valido o no el telefono
    return valido ? null : { telefonoInvalido: true };
  }

  formularioContacto = new FormGroup({
    nombre: new FormControl('', [Validators.required, Validators.minLength(3)]),
    apellido: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    mensaje: new FormControl('', [Validators.required, Validators.maxLength(500)]),
    //Aqui se usa el validator personalizado
    telefono: new FormControl('', [Validators.required, this.telefonoValidator])
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
