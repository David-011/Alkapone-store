import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChatbotService {

  private apiUrl = '';

  constructor(private http: HttpClient) {
    this.apiUrl = environment.urlApiBase + 'chatbot';
  }

  getChats(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + '/');
  }

  getChatPorId(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  createChat(chat: any): Observable<any> {
    return this.http.post(this.apiUrl + '/', chat);
  }

  responderChat(id: number, respuesta: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, { respuesta });
  }

  deleteChat(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
