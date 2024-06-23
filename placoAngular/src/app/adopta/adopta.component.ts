import { Component } from '@angular/core';
import { AdopcionesService } from '../shared/adopciones.service';
import { AdoptaMascota } from '../interfaces/adopcion';
import { RouterModule } from '@angular/router';
import { MASCOTAS } from '../misMascotas'; // Importa el array MASCOTAS
import { MascotaService } from '../shared/mascota.service';

@Component({
  selector: 'app-adopta',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './adopta.component.html',
  styleUrl: './adopta.component.css'
})

export class AdoptaComponent {

  adopciones: AdoptaMascota[] = [];

  constructor(public adopcionesService: AdopcionesService) {
  }

  ngOnInit(): void {
    console.log("En este momento el componente se cargó");
    this.recuperarDatos();
  }

  recuperarDatos() {
    console.log("Recuperando datos de Firebase");
    this.adopcionesService.getAdopciones().subscribe({
      next: (data) => {
        this.successRequest(data);
      },
      error: (error) => {
        console.error("Error al recuperar datos", error);
      }
    });
  }

  successRequest(data: AdoptaMascota[]): void {
    console.log("Datos recibidos de Firebase", data);
    this.adopciones = data;
    console.log("Array de adopciones", this.adopciones);

    // Asigna los datos de adopciones a MASCOTAS
    MASCOTAS.splice(0, MASCOTAS.length, ...this.adopciones);
  }
}
