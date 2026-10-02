import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Carrito } from '../models/carrito';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {

  private apiUrl = '';

  constructor(private http: HttpClient) {
    this.apiUrl = environment.urlApiBase + 'carrito';
  }

  getCarritos(): Observable<Carrito[]> {
    return this.http.get<Carrito[]>(this.apiUrl + '/');
  }

  getCarritoPorId(id: number): Observable<Carrito> {
    return this.http.get<Carrito>(`${this.apiUrl}/${id}`);
  }

  getCarritoPorCliente(idCliente: number): Observable<Carrito[]> {
    return this.http.get<Carrito[]>(`${this.apiUrl}/cliente/${idCliente}`);
  }

  createCarrito(carrito: Carrito): Observable<any> {
    return this.http.post(this.apiUrl + '/', carrito);
  }

  updateCarrito(id: number, carrito: Carrito): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, carrito);
  }

  deleteCarrito(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
