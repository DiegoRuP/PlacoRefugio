import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RouterOutlet } from '@angular/router';
import { ComentarioComponent } from '../comentario/comentario.component';
import { VideoAdoptarPipe } from './video-adoptar.pipe';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterOutlet, VideoAdoptarPipe, ComentarioComponent, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  constructor(private router: Router) {}

  redirectToAdopta() {
    this.router.navigate(['/adopta']);
  }

  video:string="Jv1iolzbvZg";
}
