import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent {

  cliente: any = null;

  constructor(private router: Router, public cartService: CartService) {
    const c = localStorage.getItem('cliente');
    if (c) this.cliente = JSON.parse(c);
  }

  get items() { return this.cartService.getItems(); }
  get total() { return this.cartService.getTotal(); }
  get totalItems() { return this.cartService.getTotalItems(); }

  increment(id: number): void { this.cartService.increment(id); }
  decrement(id: number): void { this.cartService.decrement(id); }

  remove(id: number): void {
    Swal.fire({
      title: 'Eliminar producto',
      text: 'Seguro que deseas eliminar este producto del carrito?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ff4a17',
      cancelButtonColor: '#666',
      confirmButtonText: 'Si, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.cartService.remove(id);
        Swal.fire('Eliminado', 'Producto eliminado del carrito', 'success');
      }
    });
  }

  clearCart(): void {
    Swal.fire({
      title: 'Vaciar carrito',
      text: 'Seguro que deseas vaciar todo el carrito?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ff4a17',
      cancelButtonColor: '#666',
      confirmButtonText: 'Si, vaciar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.cartService.clearCart();
        Swal.fire('Listo', 'Carrito vaciado', 'success');
      }
    });
  }

  checkout(): void {
    if (!this.cliente) {
      Swal.fire({
        title: 'Inicia sesion',
        text: 'Debes iniciar sesion para realizar tu compra',
        icon: 'info',
        confirmButtonColor: '#ff4a17',
        confirmButtonText: 'Ir a iniciar sesion'
      }).then((result) => {
        if (result.isConfirmed) {
          this.router.navigate(['/auth']);
        }
      });
      return;
    }
    this.router.navigate(['/checkout']);
  }

  formatPrice(price: number): string {
    return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }).format(price);
  }

  continueShopping(): void {
    this.router.navigate(['/ropa']);
  }
}