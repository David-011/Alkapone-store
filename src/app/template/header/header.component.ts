import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  isMenuOpen = false;
  isSearchOpen = false;
  searchTerm = '';

  constructor(private router: Router, public cartService: CartService) {}

  get clienteNombre(): string | null {
    const c = localStorage.getItem('cliente');
    if (c) {
      const cliente = JSON.parse(c);
      return cliente['Nombre'] || cliente['nombre'] || null;
    }
    return null;
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  toggleSearch(): void {
    this.isSearchOpen = !this.isSearchOpen;
    if (!this.isSearchOpen) this.searchTerm = '';
  }

  search(): void {
    if (this.searchTerm.trim()) {
      this.router.navigate(['/ropa'], { queryParams: { q: this.searchTerm } });
      this.isSearchOpen = false;
    }
  }

  goToCart(): void {
    this.router.navigate(['/carrito']);
  }

  goToAuth(): void {
    this.router.navigate(['/auth']);
  }

  logout(): void {
    localStorage.removeItem('cliente');
    localStorage.removeItem('carrito');
    this.router.navigate(['/home']);
  }
}
