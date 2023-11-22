// home.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormService } from '../form.service';

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

  constructor(private formService: FormService, private router: Router) {}

  submitForm() {
    this.formService.submitForm(this.formData).subscribe(
      response => {
        console.log('Formulario enviado con éxito:', response);
        // Redirige a la ruta /register después de enviar el formulario con éxito
        this.router.navigate(['/register']);
      },
      error => {
        console.error('Error al enviar el formulario:', error.message);
        console.log('Error completo:', error);
      }
    );
  }
}
