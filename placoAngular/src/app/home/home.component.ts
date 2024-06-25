import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RouterOutlet } from '@angular/router';
import { ComentarioComponent } from '../comentario/comentario.component';
import { VideoAdoptarPipe } from './video-adoptar.pipe';
import { QRCodeModule } from 'angularx-qrcode';
import { ObtencionNodeJSService } from '../shared/obtencion-node-js.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterOutlet, VideoAdoptarPipe, ComentarioComponent,QRCodeModule, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  qr:any='';
  array:any[]=[];
  ruta:string="";
  nombre:string="";
  showModal: boolean = true;

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

  closeModal() {
    this.showModal = false;
  }
  
  redirectToAdopta() {
    this.router.navigate(['/adopta']);
  }
  fontSize: number = 16;
  isContrastMode: boolean = false;
  paddingSize: number = 10; // Tamaño inicial del relleno
  isDyslexicFont: boolean = false;
  voices: SpeechSynthesisVoice[] = [];
  increaseFontSize() {
    this.fontSize += 2;
  }
  decreaseFontSize() {
    this.fontSize -= 2;
  }
  

  toggleContrast() {
    this.isContrastMode = !this.isContrastMode;
  }
  

  increasePadding() {
    this.paddingSize += 10; // Aumentar el tamaño del relleno en 10px
  }
  

  toggleDyslexicFont() {
    this.isDyslexicFont = !this.isDyslexicFont;
  }



  loadVoices() {
    const synth = window.speechSynthesis;
    this.voices = synth.getVoices();
    if (this.voices.length === 0) {
      synth.onvoiceschanged = () => {
        this.voices = synth.getVoices();
      };
    }
  }

  readContent() {
    const contentElement = document.getElementById('content');
    if (contentElement) {
      const contentText = contentElement.innerText;
      this.speak(contentText);
    }
  }

  speak(text: string) {
    const synth = window.speechSynthesis;
    if (synth.speaking) {
      console.error('SpeechSynthesis.speaking');
      return;
    }

    const utterThis = new SpeechSynthesisUtterance(text);
    utterThis.onend = () => {
      console.log('SpeechSynthesisUtterance.onend');
    };

    utterThis.onerror = (event) => {
      console.error('SpeechSynthesisUtterance.onerror', event);
    };

    // Filtra las voces en español
    const spanishVoices = this.voices.filter((voice) => voice.lang.startsWith('es'));
    if (spanishVoices.length > 0) {
      utterThis.voice = spanishVoices[0];
    } else {
      console.warn('No se encontró ninguna voz en español');
    }

    utterThis.pitch = 1;
    utterThis.rate = 1;
    synth.speak(utterThis);
  }
  video:string="Jv1iolzbvZg";
}
