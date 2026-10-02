import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cliente } from '../models/cliente';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private apiUrl = '';

  constructor(private http: HttpClient) {
    this.apiUrl = environment.urlApiBase + 'cliente';
  }

  getClientes(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(this.apiUrl + '/');
  }

  getClientePorId(id: number): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.apiUrl}/${id}`);
  }

  getClientePorCorreo(correo: string): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.apiUrl}/correo/${correo}`);
  }

  createCliente(cliente: Cliente): Observable<any> {
    return this.http.post(this.apiUrl + '/', cliente);
  }

  updateCliente(id: number, cliente: Cliente): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, cliente);
  }

  deleteCliente(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
