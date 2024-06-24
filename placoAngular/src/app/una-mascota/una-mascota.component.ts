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
