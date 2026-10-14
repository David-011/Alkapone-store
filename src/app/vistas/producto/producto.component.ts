import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { FavoritesService } from '../../services/favorites.service';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent {
  producto: any = null;
  relacionados: any[] = [];
  cargando = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private cartService: CartService,
    public favs: FavoritesService
  ) {
    this.route.paramMap.subscribe(p => this.cargar(Number(p.get('id'))));
  }

  cargar(id: number): void {
    this.cargando = true;
    this.producto = null;
    window.scrollTo(0, 0);
    this.productService.getProductos().subscribe({
      next: (lista: any[]) => {
        this.producto = lista.find((x: any) => x.idProducto === id) || null;
        this.relacionados = this.producto
          ? lista.filter((x: any) => x.categoria === this.producto.categoria && x.idProducto !== id).slice(0, 4)
          : [];
        this.cargando = false;
      },
      error: () => { this.cargando = false; }
    });
  }

  agregar(): void {
    if (this.producto && this.producto.stock > 0) {
      this.cartService.addToCart(this.producto);
    }
  }

  ver(id: number): void {
    this.router.navigate(['/producto', id]);
  }

  volver(): void {
    this.router.navigate(['/home']);
  }

  formatPrice(price: number): string {
    return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }).format(price);
  }
}
