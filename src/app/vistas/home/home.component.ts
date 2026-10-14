import { CartService } from '../../services/cart.service';
import { FavoritesService } from '../../services/favorites.service';
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  featuredProducts: Product[] = [];
  isLoading = true;

  constructor(private cartService: CartService, public favs: FavoritesService, private productService: ProductService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.isLoading = true;
    this.productService.getProductos().subscribe({
      next: (products) => {
        this.featuredProducts = products.slice(0, 8);
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error al cargar productos:', err);
        this.isLoading = false;
      }
    });
  }

  addToCart(product: any): void {
    this.cartService.addToCart(product);
  }
}
