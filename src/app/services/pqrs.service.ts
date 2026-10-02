import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pqrs } from '../models/pqrs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PqrsService {

  private apiUrl = '';

  constructor(private http: HttpClient) {
    this.apiUrl = environment.urlApiBase + 'pqrs';
  }

  getPqrs(): Observable<Pqrs[]> {
    return this.http.get<Pqrs[]>(this.apiUrl + '/');
  }

  getPqrsPorId(id: number): Observable<Pqrs> {
    return this.http.get<Pqrs>(`${this.apiUrl}/${id}`);
  }

  getPqrsPorCliente(idCliente: number): Observable<Pqrs[]> {
    return this.http.get<Pqrs[]>(`${this.apiUrl}/cliente/${idCliente}`);
  }

  createPqrs(pqrs: Pqrs): Observable<any> {
    return this.http.post(this.apiUrl + '/', pqrs);
  }

  updatePqrs(id: number, pqrs: Pqrs): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, pqrs);
  }

  deletePqrs(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
