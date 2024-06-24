import { Component, OnInit, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AdopcionesService } from '../shared/adopciones.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';
import { Firestore, collectionData, collection, addDoc, query, where, getDocs } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-formulario',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './formulario.component.html',
  styleUrl: './formulario.component.css'
})
export class FormularioComponent implements OnInit {
  @Input() nombreMascota: string = '';
  nombre: string = '';
  correo: string = '';
  telefono: number = 0;
  hora: number = 0;
  fecha: string = '';

  citas: any[] = [];

  constructor(private adopcionesService: AdopcionesService, private http: HttpClient, private firestore: Firestore, private authService: AuthService) {}

  mostrarError: boolean = false;
  mensajeDias: boolean = false;
  errorMensaje: string = '';
  mensajeHora: boolean = false;
  mostrarExito: boolean = false;

  async onSubmit() {
    if (!this.nombre || !this.correo || !this.telefono || !this.hora || !this.fecha) {
      Swal.fire({
        icon: 'error',
        title: 'Error...',
        text: 'Por favor, completa todos los campos'
      });
      return;
    }

    const fechaSeleccionada = new Date(this.fecha);
    const fechaActual = new Date();

    if (fechaSeleccionada < fechaActual) {
      Swal.fire({
        icon: 'error',
        title: 'Error...',
        text: 'Por favor, ingresa una fecha válida'
      });
      return;
    }

    const horaSeleccionada = this.hora;
    const citasRef = collection(this.firestore, 'citas');
    const q = query(citasRef, where('fecha', '==', this.fecha), where('hora', '==', this.hora));
    const querySnapshot = await getDocs(q);
    const currentUser = this.authService.currentUserSig();

    if (!querySnapshot.empty) {
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

    this.nombre = '';
    this.correo = '';
    this.telefono = 0;
    this.hora = 0;
    this.fecha = '';

    this.mostrarError = false;
    this.mostrarExito = true;

    setTimeout(() => {
      this.mostrarExito = false;
    }, 3000);

    this.http.post('http://167.71.175.189:3000/agendar-cita', nuevaCita).subscribe(
      (response: any) => {
        addDoc(citasRef, nuevaCita);
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
      });
  }

  async ngOnInit() {
    const currentUser = this.authService.currentUserSig();
    if (currentUser) {
      this.correo = currentUser.correo;
    }
    
    const citasRef = collection(this.firestore, 'citas');
    const q = query(citasRef);
    const querySnapshot = await getDocs(q);
    this.citas = querySnapshot.docs.map(doc => doc.data());
  }

  ordenarCitasPorFecha(citas: any[]): any[] {
    return citas.sort((a, b) => new Date(a.fecha).getTime() - new Date(b.fecha).getTime());
  }
}
