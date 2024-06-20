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

}
