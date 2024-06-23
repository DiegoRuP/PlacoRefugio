import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CargandoService {

  private cargandoSubject = new BehaviorSubject<boolean>(false);
  public  cargando$ = this.cargandoSubject.asObservable();

  mostrarCarga() {
    this.cargandoSubject.next(true);
  }

  ocultarCarga() {
    this.cargandoSubject.next(false);
  }
  
}
