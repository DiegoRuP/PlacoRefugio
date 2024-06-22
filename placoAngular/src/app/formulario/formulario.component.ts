import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Input } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-formulario',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './formulario.component.html',
  styleUrl: './formulario.component.css'
})

export class FormularioComponent implements OnInit {

  @Input() nombreMascota: string = '';
  nombre: string ='';
  correo: string ='';
  telefono: number = 0;
  hora: number = 0;
  fecha: string ='';

  citas: any[] = [];


  mostrarError : boolean = false;
  mensajeDias : boolean = false;
  errorMensaje: string = '';
  mensajeHora: boolean= false;

  mostrarExito : boolean = false;

    constructor(private http: HttpClient) {}  

    onSubmit() {
      // Validar campos
      if (!this.nombre || !this.correo || !this.telefono || !this.hora || !this.fecha) {
        Swal.fire({
          icon: 'error',
          title: 'Error...',
          text: 'Por favor, completa todos los campos'
        });
        return;
      }
  
      // Convertir la fecha ingresada a un objeto Date
      const fechaSeleccionada = new Date(this.fecha);
  
      // Obtener la fecha actual
      const fechaActual = new Date();
  
      // Verificar si la fecha seleccionada es anterior a la fecha actual
      if (fechaSeleccionada < fechaActual) {
        Swal.fire({
          icon: 'error',
          title: 'Error...',
          text: 'Por favor, ingresa una fecha válida'
        });
        return;
      }
  
      const horaSeleccionada = this.hora;
  
      // Obtener citas para la fecha seleccionada
      const citasFechaSeleccionada = this.citas.filter(cita => {
        const citaFecha = new Date(cita.fecha);
        return citaFecha.toDateString() === fechaSeleccionada.toDateString();
      });
  
      // Verificar si ya hay una cita a la misma hora
      const citaExistente = citasFechaSeleccionada.find(cita => cita.hora === horaSeleccionada);
  
      if (citaExistente) {
        Swal.fire({
          icon: 'error',
          title: 'Error...',
          text: 'La hora que quiere, ya está ocupada, por favor seleccione otra hora'
        });
        return;
      }
  
      const nuevaCita = {
        nombre: this.nombre,
        correo: this.correo,
        telefono: this.telefono,
        hora: this.hora,
        fecha: this.fecha,
        nombreMascota: this.nombreMascota
      };
  
      // Limpiar campos
      this.nombre = '';
      this.correo = '';
      this.telefono = 0;
      this.hora = 0;
      this.fecha = '';
  
      this.mostrarError = false;
  
      this.mostrarExito = true;
  
      // Ocultar alerta de éxito
      setTimeout(() => {
        this.mostrarExito = false;
      }, 3000);
  
      this.citas.push(nuevaCita); // Agregar la cita a la lista
      localStorage.setItem('citas', JSON.stringify(this.citas)); // Guardar la lista en localStorage
      console.log('Cita guardada:', nuevaCita);
  
      localStorage.setItem('fechaSeleccionada', this.fecha);
  
      // Enviar datos al servidor para agendar la cita y enviar el correo electrónico
      this.http.post('http://localhost:3000/agendar-cita', nuevaCita).subscribe(
        (response: any) => {
          console.log('Cita agendada:', response);
          Swal.fire({
            icon: 'success',
            title: '¡Cita agendada!',
            text: 'La cita se ha agendado correctamente.'
          });
        },
        (error: HttpErrorResponse) => {
          console.error('Error al agendar la cita:', error);
          Swal.fire({
            icon: 'error',
            title: 'Error...',
            text: 'Hubo un problema al agendar la cita, por favor intenta de nuevo más tarde.'
          });
        }
      );
    }
  
    ngOnInit() {
      const citasGuardadas = localStorage.getItem('citas');
      if (citasGuardadas) {
        this.citas = JSON.parse(citasGuardadas); // Recuperar la lista del localstorage
      }
    }
  
    ordenarCitasPorFecha(citas: any[]): any[] {
      return citas.sort((a, b) => new Date(a.fecha).getTime() - new Date(b.fecha).getTime());
    }
  }