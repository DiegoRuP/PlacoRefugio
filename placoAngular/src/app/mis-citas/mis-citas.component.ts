import { Component, OnInit } from '@angular/core';
import { Firestore, collection, query, where, getDocs, deleteDoc, doc } from '@angular/fire/firestore';
import { AuthService } from '../auth.service'; // Ajusta la ruta según corresponda
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { CargandoService } from '../cargando.service';


@Component({
  selector: 'app-mis-citas',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './mis-citas.component.html',
  styleUrls: ['./mis-citas.component.css']
})
export class MisCitasComponent implements OnInit {
  citas$: Observable<any[]> | undefined;

  constructor(private firestore: Firestore, private authService: AuthService, private cargandoService: CargandoService) {}

  ngOnInit() {
    const currentUser = this.authService.currentUserSig();
    
    if (currentUser) {
      const citasRef = collection(this.firestore, 'citas');
      const q = query(citasRef, where('correo', '==', currentUser.correo));
      this.citas$ = from(getDocs(q)).pipe(
        map(querySnapshot => {
          const citas = querySnapshot.docs.map(doc => doc.data());
          return citas.sort((a, b) => new Date(a['fecha']).getTime() - new Date(b['fecha']).getTime());
        })
      );
    }
  }

  async cancelarCita(cita: any) {
    try {
      const citasRef = collection(this.firestore, 'citas');
      const q = query(citasRef, 
        where('correo', '==', cita.correo), 
        where('nombreMascota', '==', cita.nombreMascota),
        where('fecha', '==', cita.fecha),
        where('hora', '==', cita.hora));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach(async (docSnapshot) => {
        const docRef = doc(this.firestore, `citas/${docSnapshot.id}`);
        await deleteDoc(docRef);
      });
      // Refrescar la lista de citas después de la eliminación
      this.ngOnInit();
    } catch (error) {
      console.error("Error al cancelar la cita: ", error);
    }
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
  