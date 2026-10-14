import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import Swal from 'sweetalert2';
import { environment } from '../../environments/environment';

export interface FavoriteItem {
  idProducto: number;
  nombre: string;
  imagen: string;
  precio: number;
  categoria: string;
}

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {
  private base = environment.urlApiBase + 'favorito';
  private syncedFor: number | null = null;

  constructor(private http: HttpClient) {}

  private clienteId(): number {
    try {
      const d = localStorage.getItem('cliente');
      if (!d) { return 0; }
      const c = JSON.parse(d);
      return Number(c.IdCliente || c.idCliente || 0);
    } catch { return 0; }
  }

  private read(): FavoriteItem[] {
    try {
      const d = localStorage.getItem('favoritos');
      return d ? JSON.parse(d) : [];
    } catch { return []; }
  }

  private save(items: FavoriteItem[]): void {
    localStorage.setItem('favoritos', JSON.stringify(items));
  }

  private ensureSync(): void {
    const id = this.clienteId();
    if (id === this.syncedFor) { return; }
    const previo = this.syncedFor;
    this.syncedFor = id;
    if (!id) {
      if (previo) { this.save([]); }
      return;
    }
    const subir = this.read().map(i =>
      firstValueFrom(this.http.post(this.base, { IdCliente: id, IdProducto: i.idProducto })).catch(() => null)
    );
    Promise.all(subir).then(() => {
      this.http.get<FavoriteItem[]>(this.base + '/' + id).subscribe({
        next: (r) => this.save(r),
        error: () => {}
      });
    });
  }

  getItems(): FavoriteItem[] {
    this.ensureSync();
    return this.read();
  }

  isFavorite(id: number): boolean {
    return this.getItems().some(i => i.idProducto === id);
  }

  toggle(product: any): void {
    this.ensureSync();
    const items = this.read();
    const id = this.clienteId();
    const exists = items.some(i => i.idProducto === product.idProducto);
    if (exists) {
      this.save(items.filter(i => i.idProducto !== product.idProducto));
      if (id) {
        this.http.delete(this.base + '/' + id + '/' + product.idProducto).subscribe({ error: () => {} });
      }
    } else {
      items.push({
        idProducto: product.idProducto,
        nombre: product.nombre,
        imagen: product.imagen || product.Imagen || '',
        precio: product.precio,
        categoria: product.categoria
      });
      this.save(items);
      if (id) {
        this.http.post(this.base, { IdCliente: id, IdProducto: product.idProducto }).subscribe({ error: () => {} });
      }
      Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'success',
        title: 'Agregado a favoritos',
        showConfirmButton: false,
        timer: 1300
      });
    }
  }

  remove(productId: number): void {
    this.ensureSync();
    this.save(this.read().filter(i => i.idProducto !== productId));
    const id = this.clienteId();
    if (id) {
      this.http.delete(this.base + '/' + id + '/' + productId).subscribe({ error: () => {} });
    }
  }

  getCount(): number {
    return this.getItems().length;
  }
}
