import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-pqrs',
  templateUrl: './pqrs.component.html',
  styleUrls: ['./pqrs.component.css']
})
export class PqrsComponent {
  tipo = 'Peticion';
  descripcion = '';
  enviando = false;

  constructor(private http: HttpClient) {}

  enviar(): void {
    if (this.descripcion.trim().length < 10) {
      Swal.fire('Mensaje muy corto', 'Cuentanos un poco mas (minimo 10 caracteres).', 'warning');
      return;
    }
    if (this.enviando) { return; }
    this.enviando = true;
    const data = localStorage.getItem('cliente');
    const c = data ? JSON.parse(data) : null;
    const body = { IdCliente: c ? (c.IdCliente || c.idCliente || null) : null, Tipo: this.tipo, Descripcion: this.descripcion };
    this.http.post<any>(environment.urlApiBase + 'pqrs', body).subscribe({
      next: (r) => {
        this.enviando = false;
        this.descripcion = '';
        Swal.fire('Recibido', 'Tu solicitud #' + r.idPQRS + ' fue registrada. Te responderemos pronto.', 'success');
      },
      error: () => {
        this.enviando = false;
        Swal.fire('Error', 'No se pudo enviar. Intenta de nuevo.', 'error');
      }
    });
  }
}
