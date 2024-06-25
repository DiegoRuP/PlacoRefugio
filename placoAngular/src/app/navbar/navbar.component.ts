import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent implements OnInit {
  authService = inject(AuthService);
  constructor(private router: Router) { }
  esAdmin: boolean = false;
  noEs: boolean = true;
  

  buscarMascota(raza: string) {
    this.router.navigate(['/buscador', raza]);
  }

  closeMenu() {
    const navbarCollapse = document.querySelector('.navbar-collapse') as HTMLElement;
    if (navbarCollapse.classList.contains('show')) {
      navbarCollapse.classList.remove('show');
    }
  }

  ngOnInit(): void {
    this.authService.user$.subscribe(user => {
      if (user) {
        this.authService.currentUserSig.set({
          correo: user.email!,
          usuario: user.displayName!,
        });
        this.esAdmin = user.displayName === 'adDiego';
      } else {
        this.authService.currentUserSig.set(null);
        this.esAdmin = false;
      }
      console.log("HOLA CURRENT USER", this.authService.currentUserSig());
    });
  }

  logout(): void {
    console.log('Hasta luego');
    this.authService.logout();
    this.closeMenu();  // Cierra el menú al hacer logout
  }
}
