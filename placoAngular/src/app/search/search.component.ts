import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MascotaService } from '../shared/mascota.service';
import { AdoptaMascota } from '../interfaces/adopcion';
import { UnaMascotaComponent } from '../una-mascota/una-mascota.component';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [UnaMascotaComponent],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {
  razam: string = '';
  indice: number = 0;

  mimascota: AdoptaMascota = {
    id: 0,
    imagen: '',
    animal: '',
    nombre: '',
    edad: 0,
    color: '',
    raza: '',
    tiempo: 0,
    descripcion: '',
  };

  constructor(private mascotaService: MascotaService, private activatedRoute:ActivatedRoute) {
    this.activatedRoute.params.subscribe(params => {
      this.razam = params['razam'];
      this.indice = this.mascotaService.searchMascota(this.razam);
      console.log("Indice", this.indice);

      if (this.indice != -1) {
        this.mimascota=this.mascotaService.getUnaAdopcion(this.indice);
      }1
    });
  }
}
