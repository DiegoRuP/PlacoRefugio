import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RouterOutlet } from '@angular/router';
import { ComentarioComponent } from '../comentario/comentario.component';
import { VideoAdoptarPipe } from './video-adoptar.pipe';
import { QRCodeModule } from 'angularx-qrcode';
import { ObtencionNodeJSService } from '../shared/obtencion-node-js.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterOutlet, VideoAdoptarPipe, ComentarioComponent,QRCodeModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  qr:any='';
  array:any[]=[];
  ruta:string="";
  nombre:string="";
  constructor(private router: Router, private apiBDService:ObtencionNodeJSService) {}

  generarQRMascota(){
    this.apiBDService.getData().subscribe(data=>{
      this.array = data;
      console.log(this.array);
      this.QR();
    },
      error =>{
        console.error('Error en la obtencion de los datos del API',error);
      }
    );
  }

  QR(){
    const randomMascota = this.getRandomMascota();
    let texto = randomMascota.descripcion+'. Datos Caracteristicos: Raza: '+randomMascota.raza+", Color: "+randomMascota.color+", Animal: "+randomMascota.animal+", Nombre: "+randomMascota.nombre+", Edad: "+randomMascota.edad+" años.";
    this.ruta = randomMascota.imagen;
    this.nombre = randomMascota.nombre;
    this.qr = texto;
  }

  getRandomMascota():any{
    const randomIndex = Math.floor(Math.random()*this.array.length);
    return this.array[randomIndex];
  }
  
  redirectToAdopta() {
    this.router.navigate(['/adopta']);
  }

  video:string="Jv1iolzbvZg";
}
