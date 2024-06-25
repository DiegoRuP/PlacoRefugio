import { Component } from '@angular/core';
import { AdopcionesService } from '../shared/adopciones.service';
import { AdoptaMascota } from '../interfaces/adopcion';
import { RouterModule } from '@angular/router';
import { MASCOTAS } from '../misMascotas'; // Importa el array MASCOTAS
import { MascotaService } from '../shared/mascota.service';
import { CargandoService } from '../cargando.service';

@Component({
  selector: 'app-adopta',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './adopta.component.html',
  styleUrl: './adopta.component.css'
})

export class AdoptaComponent {

  adopciones: AdoptaMascota[] = [];

  constructor(private cargandoService: CargandoService, public adopcionesService: AdopcionesService) {
  }

  ngOnInit(): void {
    this.cargandoService.mostrarCarga();
    this.recuperarDatos();
  }

  recuperarDatos() {
    console.log("Recuperando datos de Firebase");
    this.adopcionesService.getAdopciones().subscribe({
      next: (data) => {
        this.successRequest(data);
        this.cargandoService.ocultarCarga();
      },
      error: (error) => {
        console.error("Error al recuperar datos", error);
        this.cargandoService.ocultarCarga();
      }
    });
  }

  successRequest(data: AdoptaMascota[]): void {
    console.log("Datos recibidos de Firebase", data);
    this.adopciones = data;
    console.log("Array de adopciones", this.adopciones);

    // Asigna los datos de adopciones a MASCOTAS
    MASCOTAS.splice(0, MASCOTAS.length, ...this.adopciones);
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
}
