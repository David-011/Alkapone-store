import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  items: any[] = [];
  subtotal: number = 0;
  envio: number = 0;
  total: number = 0;
  clienteNombre: string = '';
  idCliente: number = 0;
  enviando = false;

  direccion: string = '';
  ciudad: string = '';
  telefono: string = '';
  metodoPago: string = 'contraentrega';

  constructor(private router: Router, private http: HttpClient) {}

  ngOnInit(): void {
    const cliente = localStorage.getItem('cliente');
    if (!cliente) {
      this.router.navigate(['/auth']);
      return;
    }
    const c = JSON.parse(cliente);
    this.clienteNombre = c.Nombre || c.nombre || '';
    this.idCliente = c.IdCliente || c.idCliente || 0;
    this.direccion = c.Direccion || c.direccion || '';
    this.telefono = c.Telefono || c.telefono || '';

    const cart = localStorage.getItem('carrito');
    if (cart) {
      this.items = JSON.parse(cart);
    }
    this.calcularTotales();
  }

  calcularTotales(): void {
    this.subtotal = this.items.reduce((sum: number, i: any) => sum + (i.precio * i.cantidad), 0);
    this.envio = this.subtotal > 150000 ? 0 : 12000;
    this.total = this.subtotal + this.envio;
  }

  formatPrice(price: number): string {
    return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }).format(price);
  }

  confirmarPedido(): void {
    if (!this.direccion || !this.ciudad || !this.telefono) {
      Swal.fire('Error', 'Completa todos los campos de envio', 'error');
      return;
    }
    if (!this.idCliente) {
      Swal.fire('Sesion', 'Cierra sesion y vuelve a iniciarla para continuar', 'warning');
      return;
    }
    if (this.enviando || this.items.length === 0) {
      return;
    }
    this.enviando = true;
    const body = {
      IdCliente: this.idCliente,
      Total: this.total,
      MetodoPago: this.metodoPago,
      items: this.items.map((i: any) => ({ idProducto: i.idProducto, nombre: i.nombre, cantidad: i.cantidad, precio: i.precio }))
    };
    this.http.post<any>(environment.urlApiBase + 'pedido', body).subscribe({
      next: (r) => {
        this.enviando = false;
        Swal.fire({
          title: 'Pedido Confirmado',
          text: 'Tu pedido #' + r.idPedido + ' fue registrado. Gracias por comprar en Alkapone Store.',
          icon: 'success',
          confirmButtonText: 'Volver al inicio',
          confirmButtonColor: '#000'
        }).then(() => {
          localStorage.removeItem('carrito');
          this.router.navigate(['/home']);
        });
      },
      error: () => {
        this.enviando = false;
        Swal.fire('Error', 'No se pudo registrar el pedido. Intenta de nuevo.', 'error');
      }
    });
  }
}
