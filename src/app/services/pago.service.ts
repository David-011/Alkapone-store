import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pago } from '../models/pago';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PagoService {

  private apiUrl = '';

  constructor(private http: HttpClient) {
    this.apiUrl = environment.urlApiBase + 'pago';
  }

  getPagos(): Observable<Pago[]> {
    return this.http.get<Pago[]>(this.apiUrl + '/');
  }

  getPagoPorId(id: number): Observable<Pago> {
    return this.http.get<Pago>(`${this.apiUrl}/${id}`);
  }

  getPagoPorPedido(idPedido: number): Observable<Pago> {
    return this.http.get<Pago>(`${this.apiUrl}/pedido/${idPedido}`);
  }

  createPago(pago: Pago): Observable<any> {
    return this.http.post(this.apiUrl + '/', pago);
  }

  deletePago(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
