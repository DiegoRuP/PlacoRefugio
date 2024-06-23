import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { MascotaService } from '../shared/mascota.service';
import { AdoptaMascota } from '../interfaces/adopcion';
import { FormularioComponent } from '../formulario/formulario.component';
import { AdoptaComponent } from '../adopta/adopta.component';


@Component({
  selector: 'app-una-mascota',
  standalone: true,
  imports: [RouterModule, FormularioComponent],
  templateUrl: './una-mascota.component.html',
  styleUrl: './una-mascota.component.css'
})
export class UnaMascotaComponent {
  
    @Input() mascota!:AdoptaMascota;
    constructor(private mascotaService: MascotaService, private activatedRoute: ActivatedRoute) {
      this.activatedRoute.params.subscribe(params => {
        const id = params['id'];
        console.log('ID recibido:', id);
        this.mascota = this.mascotaService.getUnaAdopcion(id);
        console.log('Mascota obtenida:', this.mascota);
      });
    }
}
