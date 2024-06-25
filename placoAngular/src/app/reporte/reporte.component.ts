import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Cita } from '../interfaces/citas';
import { AdopcionesService } from '../shared/adopciones.service';
import { CargandoService } from '../cargando.service';
import { AdoptaMascota } from '../interfaces/adopcion';
import { ObtencionNodeJSService } from '../shared/obtencion-node-js.service';

//Grafica
import Chart, {registerables, ChartType} from 'chart.js/auto';
Chart.register(...registerables);

@Component({
  selector: 'app-reporte',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reporte.component.html',
  styleUrl: './reporte.component.css'
})

export class ReporteComponent{
  citas: Cita[] = [];
  adopciones: AdoptaMascota[] = [];	
  razaCounts: { [raza: string]: number } = {};
  edadCounts: { [edad: string]: number } = {};
  tiempoCounts: { [tiempo: string]: number } = {};

  // Variables para almacenar los datos de las gráficas
  datos: any []= [];
  //Grafica
  razas: { raza: string, cantidad: number }[] = [];
  edades: { edad: string, cantidad: number }[] = [];
  tiempos: { tiempo: string, cantidad: number }[] = [];

  graficaraza: Chart | undefined;
  graficaedad: Chart | undefined;
  graficatiempo: Chart | undefined;
  //Grafica
  
  constructor(private obtencionService: ObtencionNodeJSService, private adopcionesService: AdopcionesService, private cargandoService: CargandoService) { }
  ngOnInit(): void {
    this.cargandoService.mostrarCarga();
    this.recuperarDatos();
  }
  

  recuperarDatos() {
    console.log("Recuperando datos de Firebase");
    this.adopcionesService.getCitas().subscribe({
      next: (data: Cita[]) => {
        this.citas = data;
        this.cargandoService.ocultarCarga();
      },
      error: (error) => {
        console.error("Error al recuperar datos", error);
        this.cargandoService.ocultarCarga();
      }
    });

    this.adopcionesService.getAdopciones().subscribe({
      next: (data: AdoptaMascota[]) => {
        this.adopciones=data;
        this.procesoAdopciones();
        this.cargandoService.ocultarCarga();
        this.obtenerInfoGraficas();
      },
      error: (error) => {
        console.error("Error al recuperar datos", error);
        this.cargandoService.ocultarCarga();
      }
    });
  }

  procesoAdopciones() {
    this.adopciones.forEach(adopcion => {
      // Contar por raza
      if (this.razaCounts[adopcion.raza]) {
        this.razaCounts[adopcion.raza]++;
      } else {
        this.razaCounts[adopcion.raza] = 1;
      }

      // Contar por edad
      if (this.edadCounts[adopcion.edad]) {
        this.edadCounts[adopcion.edad]++;
      } else {
        this.edadCounts[adopcion.edad] = 1;
      }

      // Contar por tiempo
      if (this.tiempoCounts[adopcion.tiempo]) {
        this.tiempoCounts[adopcion.tiempo]++;
      } else {
        this.tiempoCounts[adopcion.tiempo] = 1;
      }
    });
  }

  getRazaKeys(): string[] {
    return Object.keys(this.razaCounts);
  }

  getEdadKeys(): string[] {
    return Object.keys(this.edadCounts);
  }

  getTiempoKeys(): string[] {
    return Object.keys(this.tiempoCounts);
  }


  //Se obtiene el array con la informacion de los animales del servicio
  //Obtener-node-js y se guarda en array datos
  obtenerInfoGraficas(): void {
    this.obtencionService.getData().subscribe(data=>{
      this.datos = data;
      console.log(this.datos);
      this.procesarDatos(); // Llama a la función que procesa los datos
    },
    error =>{
      console.error('Error en la obtencion de los datos del API',error);
    });
  }

  //Aqui se procesan los datos extraigo la raza y cuantos animales de esa raza hay
  //Edades y cuantos de esa edad hay
  //Tiempo en adopcion en meses y cuantos hay con el mismo tiempo
  procesarDatos(): void {
    this.datos.forEach((dato) => {
      const raza = dato.raza;
      const razaIndex = this.razas.findIndex((item) => item.raza === raza);
      if (razaIndex !== -1) {
        this.razas[razaIndex].cantidad++;
      } else {
        this.razas.push({ raza, cantidad: 1 });
      }

      const edad = dato.edad;
      const edadIndex = this.edades.findIndex((item) => item.edad === edad);
      if (edadIndex !== -1) {
        this.edades[edadIndex].cantidad++;
      } else {
        this.edades.push({ edad, cantidad: 1 });
      }

      
      const tiempo = dato.tiempo;
      const tiempoIndex = this.tiempos.findIndex((item) => item.tiempo === tiempo);
      if (tiempoIndex !== -1) {
        this.tiempos[tiempoIndex].cantidad++;
      } else {
        this.tiempos.push({ tiempo, cantidad: 1 });
      }

      console.log('Razas:', this.razas);
      console.log('Edades:', this.edades);
      console.log('Tiempos de adopción:', this.tiempos);

      
      this.actualizarGraficas();
    });
  }

  //Aqui ya hacemos las graficas se repite el proceso tres veces
  //Ya que tenemos tres graficas
  actualizarGraficas(): void {
    const ctxRazas = document.getElementById('graficaRaza') as HTMLCanvasElement;
    if (ctxRazas) {
      if (this.graficaraza) {
        this.graficaraza.destroy();
      }
      this.graficaraza = new Chart(ctxRazas, {
        type: 'bar' as ChartType,
        data: {
          labels: this.razas.map(item => item.raza),
          datasets: [{
            label: 'Razas',
            data: this.razas.map(item => item.cantidad),
            borderColor: 'rgba(0, 0, 0, 1)',
            borderWidth: 1,
            backgroundColor: 'rgba(75, 192, 192, 1)'
          }]
        },
        options: {
          responsive: true,
          plugins: {
            title: {
              display: true,
              text: 'Gráfica de Razas',
              color: 'white'
            },
            legend: {
              labels: {
                color: 'white'  
              }
            },
            tooltip: {
              mode: 'index',
              intersect: false
            }
          },
          scales: {
            x: {
              title: {
                display: true,
                text: 'Raza',
                color: 'white'
              },
              ticks: {
                color: 'white'  
              }
            },
            y: {
              title: {
                display: true,
                text: 'Cantidad',
                color: 'white'
              },
              ticks: {
                color: 'white' 
              }
            }
          }
        }
      });
    }
  
    const ctxEdades = document.getElementById('graficaEdad') as HTMLCanvasElement;
    if (ctxEdades) {
      if (this.graficaedad) {
        this.graficaedad.destroy();
      }
      this.graficaedad = new Chart(ctxEdades, {
        type: 'bar' as ChartType,
        data: {
          labels: this.edades.map(item => item.edad),
          datasets: [{
            label: 'Edades',
            data: this.edades.map(item => item.cantidad),
            borderColor: 'rgba(0, 0, 0, 1)',
            borderWidth: 1,
            backgroundColor: 'rgba(75, 192, 192, 1)'
          }]
        },
        options: {
          responsive: true,
          plugins: {
            title: {
              display: true,
              text: 'Gráfica Edades de los Perros',
              color: 'white'
            },
            legend: {
              labels: {
                color: 'white' 
              }
            },
            tooltip: {
              mode: 'index',
              intersect: false
            }
          },
          scales: {
            x: {
              title: {
                display: true,
                text: 'Años',
                color: 'white'
              },
              ticks: {
                color: 'white' 
              }
            },
            y: {
              title: {
                display: true,
                text: 'Cantidad',
                color: 'white'
              },
              ticks: {
                color: 'white' 
              }
            }
          }
        }
      });
    }
  
    const ctxTiempos = document.getElementById('graficaTiempo') as HTMLCanvasElement;
    if (ctxTiempos) {
      if (this.graficatiempo) {
        this.graficatiempo.destroy();
      }
      this.graficatiempo = new Chart(ctxTiempos, {
        type: 'bar' as ChartType,
        data: {
          labels: this.tiempos.map(item => item.tiempo),
          datasets: [{
            label: 'Tiempos de Adopción',
            data: this.tiempos.map(item => item.cantidad),
            borderColor: 'rgba(0, 0, 0, 1)',
            borderWidth: 1,
            backgroundColor: 'rgba(75, 192, 192, 1)'
            
          }]
        },
        options: {
          responsive: true,
          plugins: {
            title: {
              display: true,
              text: 'Gráfica de Tiempos de Adopción',
              color: 'white'
            },
            legend: {
              labels: {
                color: 'white' 
              }
            },
            tooltip: {
              mode: 'index',
              intersect: false
            }
          },
          scales: {
            x: {
              title: {
                display: true,
                text: 'Tiempo de Adopción en meses',
                color: 'white'
              },
              ticks: {
                color: 'white' 
              }
            },
            y: {
              title: {
                display: true,
                text: 'Cantidad',
                color: 'white'
              },
              ticks: {
                color: 'white' 
              }
            }
          }
        }
      });
    }
  }
  ngOnDestroy(): void {  
    if (this.graficaraza) {
      this.graficaraza.destroy();
    }
    if (this.graficaedad) {
      this.graficaedad.destroy();
    }
    if (this.graficatiempo) {
      this.graficatiempo.destroy();
    }
  }
}