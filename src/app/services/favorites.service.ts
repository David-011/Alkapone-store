import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

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

  getItems(): FavoriteItem[] {
    const data = localStorage.getItem('favoritos');
    return data ? JSON.parse(data) : [];
  }

  private saveItems(items: FavoriteItem[]): void {
    localStorage.setItem('favoritos', JSON.stringify(items));
  }

  isFavorite(id: number): boolean {
    return this.getItems().some(i => i.idProducto === id);
  }

  toggle(product: any): void {
    const items = this.getItems();
    const exists = items.some(i => i.idProducto === product.idProducto);
    if (exists) {
      this.saveItems(items.filter(i => i.idProducto !== product.idProducto));
    } else {
      items.push({
        idProducto: product.idProducto,
        nombre: product.nombre,
        imagen: product.imagen || product.Imagen || '',
        precio: product.precio,
        categoria: product.categoria
      });
      this.saveItems(items);
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

  remove(id: number): void {
    this.saveItems(this.getItems().filter(i => i.idProducto !== id));
  }

  getCount(): number {
    return this.getItems().length;
  }
}
