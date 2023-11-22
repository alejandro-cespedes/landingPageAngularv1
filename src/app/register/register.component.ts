import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  contador: number = 5; // Inicia con el valor del contador
  enlaceAbierto: boolean = false; // Variable para controlar si el enlace ya se ha abierto

  constructor() {}

  ngOnInit(): void {
    // Inicia el temporizador para actualizar el contador
    setInterval(() => {
      this.actualizarContador();
    }, 1000); // Actualiza cada segundo
  }

  formatTime(seconds: number): string {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    return `${this.padZero(hours)} HORAS - ${this.padZero(minutes)} MINUTOS - ${this.padZero(remainingSeconds)} SEGUNDOS`;
  }

  padZero(value: number): string {
    return value < 10 ? `0${value}` : `${value}`;
  }

  actualizarContador() {
    if (this.contador > 0) {
      this.contador--;
    } else if (!this.enlaceAbierto) {
      // Cuando el contador llega a cero y el enlace aún no se ha abierto, abre el enlace
      this.abrirEnlace();
    }
  }

  abrirEnlace() {
    // Lógica para abrir el enlace, por ejemplo:
    window.open('https://chat.whatsapp.com/GmEj1JRhaySE4esw79RjRW', '_blank');
    this.enlaceAbierto = true; // Marca que el enlace se ha abierto para evitar el bucle
  }
}
