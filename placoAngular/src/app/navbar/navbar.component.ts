import { Component, inject, OnInit } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, FormsModule, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})

export class NavbarComponent implements OnInit {
  authService = inject(AuthService);
  constructor(private router:Router) { }
  esAdmin: boolean = false;

  buscarMascota(raza: string) {
    this.router.navigate(['/buscador', raza]);
  }

  //ver si el usuario esta loueado
  ngOnInit(): void {
    this.authService.user$.subscribe(user => {
      if (user) {
        this.authService.currentUserSig.set({
          correo: user.email!,
          usuario: user.displayName!
        });
        this.esAdmin = user.displayName === 'adDiego';
      } else {
        this.authService.currentUserSig.set(null);
        this.esAdmin = false;
      }
    });
  }

  logout(): void{
    console.log('Hasta luego');
    this.authService.logout();
  }
}

