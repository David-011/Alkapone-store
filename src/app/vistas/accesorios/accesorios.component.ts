import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product';

@Component({
  selector: 'app-accesorios',
  templateUrl: './accesorios.component.html',
  styleUrls: ['./accesorios.component.css']
})
export class AccesoriosComponent implements OnInit {

  products: Product[] = [];
  filteredProducts: Product[] = [];
  isLoading = true;
  sortOption = 'recent';
  searchTerm = '';

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.isLoading = true;
    this.productService.getProductos().subscribe({
      next: (products) => {
        this.products = products.filter(p => p.categoria === 'Accesorios');
        this.filteredProducts = [...this.products];
        this.isLoading = false;
      },
      error: (err) => {
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
    switch (this.sortOption) {
      case 'price-low':
        this.filteredProducts.sort((a, b) => a.precio - b.precio);
        break;
      case 'price-high':
        this.filteredProducts.sort((a, b) => b.precio - a.precio);
        break;
      case 'name':
        this.filteredProducts.sort((a, b) => a.nombre.localeCompare(b.nombre));
        break;
      default:
        this.filteredProducts = [...this.products];
    }
  }

  formatPrice(price: number): string {
    return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }).format(price);
  }
}
