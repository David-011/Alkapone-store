import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FavoritesService } from '../../services/favorites.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-favoritos',
  templateUrl: './favoritos.component.html',
  styleUrls: ['./favoritos.component.css']
})
export class FavoritosComponent {

  constructor(
    public favs: FavoritesService,
    private cartService: CartService,
    private router: Router
  ) {}

  get items() {
    return this.favs.getItems();
  }

  addToCart(item: any): void {
    this.cartService.addToCart(item);
  }

  remove(id: number): void {
    this.favs.remove(id);
  }

  explore(): void {
    this.router.navigate(['/home']);
  }

  formatPrice(price: number): string {
    return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }).format(price);
  }
}
