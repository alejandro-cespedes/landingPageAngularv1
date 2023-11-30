// home.component.ts
import { Component, ElementRef, HostListener, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormService } from '../form.service';
import { DOCUMENT } from '@angular/common';


export interface FormData {
  id: number;
  name: string;
  email: string;
  whatsapp_number: string;
  created_at: Date;
  updated_at: Date;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  formData: FormData = {
    id: 0,
    name: '',
    email: '',
    whatsapp_number: '',
    created_at: new Date(),
    updated_at: new Date()
  };

  constructor(
    private formService: FormService,
    private router: Router,
    @Inject(DOCUMENT) private document: Document,
    private el: ElementRef
  ) {}

  @HostListener('window:touchmove', ['$event'])
  onTouchMove(event: TouchEvent) {
    if (window.innerWidth <= 428) {
      event.preventDefault();
    }
  }
  scrollToTop() {
    const start = this.document.documentElement.scrollTop || this.document.body.scrollTop;
    let distance = start;
    const duration = 1000; // Ajusta la duración de la animación (en milisegundos)

    // Ajusta la distancia en función del tipo de dispositivo (solo para pantallas más grandes que 425px)
    if (window.innerWidth > 425) {
      if (window.innerWidth <= 428) {
        // Móvil: desplazamiento más pronunciado
        distance *= 1; // Puedes ajustar el factor según tus necesidades
      } else {
        // Desktop: desplazamiento normal
        distance *= 0.8; // Puedes ajustar el factor según tus necesidades
      }
    }

    let startTime: number;

    const animateScroll = (timestamp: number) => {
      if (!startTime) {
        startTime = timestamp;
      }

      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);

      this.document.documentElement.scrollTop = start - progress * distance;
      this.document.body.scrollTop = start - progress * distance;

      if (progress < 1) {
        window.requestAnimationFrame(animateScroll);
      }
    };

    window.requestAnimationFrame(animateScroll);

    // Agregar la clase de animación para que se reproduzca la animación CSS
    this.document.body.classList.add('scroll-up-animation');

    // Eliminar la clase después de que termine la animación
    setTimeout(() => {
      this.document.body.classList.remove('scroll-up-animation');
    }, duration);
  }

submitting = false;
  submitForm() {
    // Establece submitting en true para indicar que el formulario se está enviando
    this.submitting = true;

    // Aquí puedes realizar la lógica de envío del formulario, por ejemplo, una llamada a un servicio HTTP
    this.formService.submitForm(this.formData).subscribe(
      response => {
        console.log('Formulario enviado con éxito:', response);

        // Restablece submitting en false después de completar la lógica de envío del formulario
        this.submitting = false;

        // Redirige a la ruta /register después de enviar el formulario con éxito
        this.router.navigate(['/register']);
      },
      error => {
        console.error('Error al enviar el formulario:', error.message);
        console.log('Error completo:', error);

        // Restablece submitting en false en caso de error
        this.submitting = false;
      }
    );
  }
}
