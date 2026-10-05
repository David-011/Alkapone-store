import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-accesorios',
  templateUrl: './accesorios.component.html',
  styleUrls: ['./accesorios.component.css']
})
export class AccesoriosComponent implements OnInit {

  products: any[] = [];
  filteredProducts: any[] = [];
  searchTerm = '';
  sortOrder = 'default';
  isLoading = true;

  constructor(
    private productService: ProductService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getProductos().subscribe({
      next: (data: any[]) => {
        this.products = data.filter(p => p.categoria === 'Accesorios');
        this.filteredProducts = [...this.products];
        this.isLoading = false;
      },
      error: (err: any) => {
        console.error('Error al cargar productos:', err);
        this.isLoading = false;
      }
    });
  }

  filterProducts(): void {
    this.filteredProducts = this.products.filter(p =>
      p.nombre.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
    this.sortProducts();
  }

  sortProducts(): void {
    if (this.sortOrder === 'asc') {
      this.filteredProducts.sort((a, b) => a.precio - b.precio);
    } else if (this.sortOrder === 'desc') {
      this.filteredProducts.sort((a, b) => b.precio - a.precio);
    }
  }

  addToCart(product: any): void {
    this.cartService.addToCart(product);
  }

  formatPrice(price: number): string {
    return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }).format(price);
  }
}