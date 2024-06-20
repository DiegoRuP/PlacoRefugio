import { Component } from '@angular/core';
import {RouterModule, RouterOutlet} from '@angular/router';
import { AboutComponent } from '../about/about.component';
import { HomeComponent } from '../home/home.component';
import { AdoptaComponent } from '../adopta/adopta.component';
import { GaleriaComponent } from '../galeria/galeria.component';
import { ReporteComponent } from '../reporte/reporte.component';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterOutlet, RouterModule, HomeComponent, AboutComponent, AdoptaComponent, GaleriaComponent, ReporteComponent],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {

}
