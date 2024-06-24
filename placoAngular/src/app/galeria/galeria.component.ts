import { Component } from '@angular/core';
import { PaginatorComponent } from '../paginator/paginator.component';
import { TablaComponent } from '../tabla/tabla.component';

@Component({
  selector: 'app-galeria',
  standalone: true,
  imports: [PaginatorComponent, TablaComponent],
  templateUrl: './galeria.component.html',
  styleUrl: './galeria.component.css'
})
export class GaleriaComponent {
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
