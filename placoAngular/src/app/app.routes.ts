import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AdoptaComponent } from './adopta/adopta.component';
import { GaleriaComponent } from './galeria/galeria.component';
import { AboutComponent } from './about/about.component';
import { ReporteComponent } from './reporte/reporte.component';
import { UnaMascotaComponent } from './una-mascota/una-mascota.component';
import { SearchComponent } from './search/search.component';
import { LoginComponent } from './login/login.component';
import { RegistroComponent } from './registro/registro.component';
import { LogintelComponent } from './logintel/logintel.component';
import { MisCitasComponent } from './mis-citas/mis-citas.component';

export const routes: Routes = [
    {path: '', redirectTo: '/home', pathMatch: 'full'},
    {path: 'home', component: HomeComponent},
    {path: 'adopta', component: AdoptaComponent},
    {path: 'galeria', component: GaleriaComponent},
    {path: 'about', component: AboutComponent},
    {path: 'reporte', component: ReporteComponent},
    {path: 'mascota/:id', component: UnaMascotaComponent},
    {path: 'buscador/:razam', component: SearchComponent},
    {path: 'login', component: LoginComponent},
    {path: 'registro', component: RegistroComponent},
    {path: 'login-tel', component: LogintelComponent},
    {path: 'misCitas', component: MisCitasComponent},
];
