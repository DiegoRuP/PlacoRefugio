import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { take } from 'rxjs/operators';
import { AdoptaMascota } from '../interfaces/adopcion';
import { Firestore, addDoc, collection, collectionData, deleteDoc, doc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Cita } from '../interfaces/citas';

@Injectable({
  providedIn: 'root'
})
export class AdopcionesService {

  urlAPI:string = "https://refugioschuchos.free.beeceptor.com/"

  constructor( private http: HttpClient, private firestore: Firestore) { }

  retornar(): Observable<any>{
    return this.http.get(this.urlAPI).pipe(take(1));
  }

  // async addAdopcion(adopcion: AdoptaMascota): Promise<void> {
  //   const adopcionesCollection = collection(this.firestore, 'adopciones');
  //   await addDoc(adopcionesCollection, adopcion);
  // }

  getAdopciones(): Observable<AdoptaMascota[]> {
    const adopcionesCollection = collection(this.firestore, 'adopciones');
    return collectionData(adopcionesCollection, { idField: 'id' }) as Observable<AdoptaMascota[]>;
  }

   async addCita(cita: Cita): Promise<void> {
    const citasCollection = collection(this.firestore, 'citas');
    await addDoc(citasCollection, cita);
  }

  getCitas(): Observable<AdoptaMascota[]> {
    const citasCollection = collection(this.firestore, 'citas');
    return collectionData(citasCollection, { idField: 'id' }) as Observable<AdoptaMascota[]>;
  }

  deleteCita(cita: Cita){
    const citasCollection = doc(this.firestore, `citas/${cita.nombre}` );
    return deleteDoc(citasCollection);
  }

  // loadAdopciones(): void {
  //   this.retornar().subscribe((data: any) => {
  //     const adopciones: AdoptaMascota[] = data.adopciones;
  //     adopciones.forEach(adopcion => {
  //       this.addAdopcion(adopcion)
  //         .then(() => {
  //           console.log(`Adopción ${adopcion.nombre} agregada con éxito`);
  //         })
  //         .catch(error => {
  //           console.error(`Error al agregar la adopción ${adopcion.nombre}: `, error);
  //         });
  //     });
  //   }, error => {
  //     console.error('Error al obtener los datos de la API: ', error);
  //   });
  // }

}
