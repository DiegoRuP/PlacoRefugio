import { Component } from '@angular/core';
import { CargandoService } from '../cargando.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pantalla-carga',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pantalla-carga.component.html',
  styleUrl: './pantalla-carga.component.css'
})
export class PantallaCargaComponent {

  cargando: Observable<boolean>;

  constructor(private cargandoService: CargandoService) {
    this.cargando = this.cargandoService.cargando$;
  }

}
