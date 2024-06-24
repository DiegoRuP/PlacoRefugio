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
}
  