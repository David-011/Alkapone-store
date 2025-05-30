import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { product } from '../models/product';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  apiBase = '';

  constructor(private _http: HttpClient) {
    this.apiBase = environment.urlApiBase + 'product';
  }

  getProductos(): Observable<product[]> {
    return this._http.get<product[]>(this.apiBase + '/');
  }

  addProducto(product: product): Observable<any> {
    return this._http.post(this.apiBase + '/', product);
  }

  updateProducto(id: number, product: product): Observable<any> {
    return this._http.put(`${this.apiBase}/${id}`, product);
  }

  deleteProducto(id: number): Observable<any> {
    return this._http.delete(`${this.apiBase}/${id}`);
  }
}
