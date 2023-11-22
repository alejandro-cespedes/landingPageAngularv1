// src/app/form.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormService {
  private apiUrl = 'http://127.0.0.1:8000/api/form/';

  constructor(private http: HttpClient) {}

  submitForm(data: any): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }

  getForms(): Observable<any> {
    return this.http.get(this.apiUrl).pipe(
      catchError(error => {
        console.error('Error al obtener formularios:', error);
        throw error;
      })
    );
  }

  getForm(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}${id}/`).pipe(
      catchError(error => {
        console.error(`Error al obtener el formulario con ID ${id}:`, error);
        throw error;
      })
    );
  }


  // Agrega métodos adicionales según sea necesario (por ejemplo, actualizar y eliminar)
}
