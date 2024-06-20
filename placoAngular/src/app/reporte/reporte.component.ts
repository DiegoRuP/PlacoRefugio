import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Cita {
  nombre: string;
  correo: string;
  telefono: number;
  hora: number;
  fecha: string;
  nombreMascota: string;
}

@Component({
  selector: 'app-reporte',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reporte.component.html',
  styleUrl: './reporte.component.css'
})

export class ReporteComponent implements OnInit{
  citasPasadas: any[] = [];
  citasFuturas: any[] = [];
citas: any;

  constructor() { }

  ordenarCitasPorFecha(citas: Cita[]): Cita[] {
    return citas.sort((a, b) => new Date(a.fecha).getTime() - new Date(b.fecha).getTime());
  }
  ordenarCitasPorFecha2(citas: Cita[]): Cita[] {
    return citas.sort((a, b) => {
      const fechaActual = new Date().getTime();
      const fechaA = new Date(a.fecha).getTime();
      const fechaB = new Date(b.fecha).getTime();

      const diffA = Math.abs(fechaActual - fechaA);
      const diffB = Math.abs(fechaActual - fechaB);

      return diffA - diffB;
    });
  }

  ngOnInit(): void {
    const citasGuardadas = localStorage.getItem('citas');
    if (citasGuardadas) {
      const citas = JSON.parse(citasGuardadas) as Cita[]; // Asegurar que las citas se interpreten como tipo Cita
      const fechaActual = new Date().toISOString().split('T')[0]; // Obtener la fecha actual en formato YYYY-MM-DD

      citas.forEach(cita => {
        if (cita.fecha < fechaActual) {
          this.citasPasadas.push(cita);
        } else {
          this.citasFuturas.push(cita);
        }
      });

      // Ordenar las citas pasadas y futuras por fecha
    this.citasPasadas = this.ordenarCitasPorFecha2(this.citasPasadas);
    this.citasFuturas = this.ordenarCitasPorFecha(this.citasFuturas);
    }
  }
}
