import { Component } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AdoptaComponent } from './adopta/adopta.component';
import { GaleriaComponent } from './galeria/galeria.component';
import { AboutComponent } from './about/about.component';
import { ReporteComponent } from './reporte/reporte.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { FormularioComponent } from './formulario/formulario.component';
import { TablaComponent } from './tabla/tabla.component';
import { PaginatorComponent } from './paginator/paginator.component';
import { ComentarioComponent } from './comentario/comentario.component';
import { AdopcionesService } from './shared/adopciones.service';
import { PantallaCargaComponent } from './pantalla-carga/pantalla-carga.component';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,  CommonModule,  RouterModule, NavbarComponent, HomeComponent, AdoptaComponent, GaleriaComponent, AboutComponent, ReporteComponent, FooterComponent, FormularioComponent, TablaComponent, PaginatorComponent, ComentarioComponent, PantallaCargaComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'refugioDIJK';
  constructor(private adopcionesService: AdopcionesService) {}
  ngOnInit(): void {
    //this.adopcionesService.loadAdopciones();
  }
}