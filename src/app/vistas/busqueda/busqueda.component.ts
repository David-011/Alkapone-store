import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styleUrls: ['./busqueda.component.css']
})
export class BusquedaComponent implements OnInit {
  productos: any[] = [];
  resultados: any[] = [];
  termino: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.termino = params['q'] || '';
      this.cargarProductos();
    });
  }

  cargarProductos(): void {
    this.productService.getProductos().subscribe((data: any) => {
      this.productos = data;
      this.filtrar();
    });
  }

  filtrar(): void {
    if (!this.termino.trim()) {
      this.resultados = this.productos;
      return;
    }
    const t = this.termino.toLowerCase();
    this.resultados = this.productos.filter((p: any) =>
      (p.nombre || p.Nombre || '').toLowerCase().includes(t) ||
      (p.categoria || p.Categoria || '').toLowerCase().includes(t) ||
      (p.descripcion || p.Descripcion || '').toLowerCase().includes(t)
    );
  }

  formatPrice(price: number): string {
    return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }).format(price);
  }

  addToCart(product: any): void {
    const cart = JSON.parse(localStorage.getItem('carrito') || '[]');
    const exists = cart.find((i: any) => (i.idProducto || i.IdProducto) === (product.idProducto || product.IdProducto));
    if (exists) {
      exists.cantidad++;
    } else {
      cart.push({ ...product, cantidad: 1 });
    }
    localStorage.setItem('carrito', JSON.stringify(cart));
  }
}
