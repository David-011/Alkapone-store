import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DetalleCarrito } from '../models/detalle-carrito';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DetalleCarritoService {

  private apiUrl = '';

  constructor(private http: HttpClient) {
    this.apiUrl = environment.urlApiBase + 'detalle-carrito';
  }

  getDetallesPorCarrito(idCarrito: number): Observable<DetalleCarrito[]> {
    return this.http.get<DetalleCarrito[]>(`${this.apiUrl}/carrito/${idCarrito}`);
  }

  createDetalle(detalle: DetalleCarrito): Observable<any> {
    return this.http.post(this.apiUrl + '/', detalle);
  }

  updateDetalle(id: number, detalle: DetalleCarrito): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, detalle);
  }

  deleteDetalle(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
