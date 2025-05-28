import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { product } from '../models/product';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  apiBase='';

  constructor(private _http: HttpClient) {
    this.apiBase = environment.urlApiBase + 'product';
   }

  getProductos(): Observable<product[]> {
    return this._http.get<product[]>(this.apiBase + '/');
  }
}
