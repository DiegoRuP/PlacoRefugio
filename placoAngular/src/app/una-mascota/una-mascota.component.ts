import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { MascotaService } from '../shared/mascota.service';
import { AdoptaMascota } from '../interfaces/adopcion';
import { FormularioComponent } from '../formulario/formulario.component';


@Component({
  selector: 'app-una-mascota',
  standalone: true,
  imports: [RouterModule, FormularioComponent],
  templateUrl: './una-mascota.component.html',
  styleUrl: './una-mascota.component.css'
})
export class UnaMascotaComponent {
  
    @Input() mascota!:AdoptaMascota;
    constructor(public mascotaService: MascotaService, public ActivatedRoute: ActivatedRoute) { 
      this.ActivatedRoute.params.subscribe(params => {
        this.mascota = this.mascotaService.getUnaAdopcion(params['id']);
      }
      )
    } 
}
