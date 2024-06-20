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

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule, NavbarComponent, HomeComponent, AdoptaComponent, GaleriaComponent, AboutComponent, ReporteComponent, FooterComponent, FormularioComponent, TablaComponent, PaginatorComponent, ComentarioComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'refugioDIJK';
}