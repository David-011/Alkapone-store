import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

interface CartItem {
  idProducto: number;
  nombre: string;
  imagen: string;
  precio: number;
  cantidad: number;
  categoria: string;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {

  getItems(): CartItem[] {
    const cart = localStorage.getItem('carrito');
    return cart ? JSON.parse(cart) : [];
  }

  private saveItems(items: CartItem[]): void {
    localStorage.setItem('carrito', JSON.stringify(items));
  }

  addToCart(product: any): void {
    const items = this.getItems();
    const existing = items.find(i => i.idProducto === product.idProducto);
    if (existing) {
      existing.cantidad++;
    } else {
      items.push({
        idProducto: product.idProducto,
        nombre: product.nombre, imagen: product.imagen || product.Imagen || "",
        precio: product.precio,
        cantidad: 1,
        categoria: product.categoria
      });
    }
    this.saveItems(items);
    Swal.fire({
      title: 'Agregado al carrito',
      text: product.nombre,
      icon: 'success',
      timer: 1500,
      showConfirmButton: false
    });
  }

  getTotalItems(): number {
    return this.getItems().reduce((sum, i) => sum + i.cantidad, 0);
  }

  getTotal(): number {
    return this.getItems().reduce((sum, i) => sum + (i.precio * i.cantidad), 0);
  }

  increment(id: number): void {
    const items = this.getItems();
    const item = items.find(i => i.idProducto === id);
    if (item) {
      item.cantidad++;
      this.saveItems(items);
    }
  }

  decrement(id: number): void {
    const items = this.getItems();
    const item = items.find(i => i.idProducto === id);
    if (item && item.cantidad > 1) {
      item.cantidad--;
      this.saveItems(items);
    }
  }

  remove(id: number): void {
    const items = this.getItems().filter(i => i.idProducto !== id);
    this.saveItems(items);
  }

  clearCart(): void {
    localStorage.removeItem('carrito');
  }
}
