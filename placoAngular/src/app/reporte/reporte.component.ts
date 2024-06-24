import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Cita } from '../interfaces/citas';
import { AdopcionesService } from '../shared/adopciones.service';
import { CargandoService } from '../cargando.service';
import { AdoptaMascota } from '../interfaces/adopcion';

@Component({
  selector: 'app-reporte',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reporte.component.html',
  styleUrl: './reporte.component.css'
})

export class ReporteComponent{
  citas: Cita[] = [];
  adopciones: AdoptaMascota[] = [];	
  razaCounts: { [raza: string]: number } = {};
  edadCounts: { [edad: string]: number } = {};
  tiempoCounts: { [tiempo: string]: number } = {};
  
  constructor(private adopcionesService: AdopcionesService, private cargandoService: CargandoService) { }
  ngOnInit(): void {
    this.cargandoService.mostrarCarga();
    this.recuperarDatos();
  }

  recuperarDatos() {
    console.log("Recuperando datos de Firebase");
    this.adopcionesService.getCitas().subscribe({
      next: (data: Cita[]) => {
        this.citas = data;
        this.cargandoService.ocultarCarga();
      },
      error: (error) => {
        console.error("Error al recuperar datos", error);
        this.cargandoService.ocultarCarga();
      }
    });

    this.adopcionesService.getAdopciones().subscribe({
      next: (data: AdoptaMascota[]) => {
        this.adopciones=data;
        this.procesoAdopciones();
        this.cargandoService.ocultarCarga();
      },
      error: (error) => {
        console.error("Error al recuperar datos", error);
        this.cargandoService.ocultarCarga();
      }
    });
  }

  procesoAdopciones() {
    this.adopciones.forEach(adopcion => {
      // Contar por raza
      if (this.razaCounts[adopcion.raza]) {
        this.razaCounts[adopcion.raza]++;
      } else {
        this.razaCounts[adopcion.raza] = 1;
      }

      // Contar por edad
      if (this.edadCounts[adopcion.edad]) {
        this.edadCounts[adopcion.edad]++;
      } else {
        this.edadCounts[adopcion.edad] = 1;
      }

      // Contar por tiempo
      if (this.tiempoCounts[adopcion.tiempo]) {
        this.tiempoCounts[adopcion.tiempo]++;
      } else {
        this.tiempoCounts[adopcion.tiempo] = 1;
      }
    });
  }

  getRazaKeys(): string[] {
    return Object.keys(this.razaCounts);
  }

  getEdadKeys(): string[] {
    return Object.keys(this.edadCounts);
  }

  getTiempoKeys(): string[] {
    return Object.keys(this.tiempoCounts);
  }
}