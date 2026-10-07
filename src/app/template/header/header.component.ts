import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  clienteNombre: string | null = null;
  cartCount: number = 0;
  isMenuOpen: boolean = false;
  isSearchOpen: boolean = false;
  searchTerm: string = '';

  constructor(private router: Router, public cartService: CartService) {}

  ngOnInit(): void {
    this.checkLogin();
    this.updateCart();
    setInterval(() => {
      this.checkLogin();
      this.updateCart();
    }, 1000);
  }

  checkLogin(): void {
    const data = localStorage.getItem('cliente');
    if (data) {
      const c = JSON.parse(data);
      this.clienteNombre = c.Nombre || c.nombre || null;
    } else {
      this.clienteNombre = null;
    }
  }

  updateCart(): void {
    const cart = localStorage.getItem('carrito');
    if (cart) {
      const items = JSON.parse(cart);
      this.cartCount = items.reduce((s: number, i: any) => s + (i.cantidad || 1), 0);
    } else {
      this.cartCount = 0;
    }
  }

  toggleMenu(): void {
  }

  toggleSearch(): void { this.isSearchOpen = !this.isSearchOpen;
  }

  irAMiCuenta(): void {
    this.router.navigate(['/mi-cuenta']);
  }

  goToAuth(): void {
    this.router.navigate(['/auth']);
  }

  goToCart(): void {
    this.router.navigate(['/carrito']);
  }

  logout(): void {
    localStorage.removeItem('cliente');
    localStorage.removeItem('carrito');
    this.clienteNombre = null;
    this.cartCount = 0;
    this.router.navigate(['/home']);
  }

  search(): void {
    if (this.searchTerm.trim()) {
      this.router.navigate(['/busqueda'], { queryParams: { q: this.searchTerm } }); this.isSearchOpen = false;
    }
  }
}
