import { Component } from '@angular/core';
import {MatTableModule} from '@angular/material/table';

export interface Perritos {
  nombre: string;
  edad: number;
  raza: string;
}

const ELEMENT_DATA: Perritos[] = [
  {nombre: 'Trapecio', edad: 3, raza: 'Pitbull'},
  {nombre: 'Max', edad: 7, raza: 'Labrador'},
  {nombre: 'Bella', edad: 2, raza: 'Pastor Alemán'},
  {nombre: 'Coco', edad: 1, raza: 'Poodle'},
  {nombre: 'Rocky', edad: 6, raza: 'Bulldog Francés'},
];

@Component({
  selector: 'app-tabla',
  standalone: true,
  imports: [MatTableModule],
  templateUrl: './tabla.component.html',
  styleUrl: './tabla.component.css'
})

export class TablaComponent {
  displayedColumns: string[] = ['nombre', 'edad', 'raza'];
  dataSource = ELEMENT_DATA;
}
