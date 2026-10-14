import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClienteService } from '../../services/cliente.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-mi-cuenta',
  templateUrl: './mi-cuenta.component.html',
  styleUrls: ['./mi-cuenta.component.css']
})
export class MiCuentaComponent implements OnInit {
  cliente: any = null;
  inicial: string = '?';
  editMode: boolean = false;
  editData: any = {};
  vista: string = 'perfil';
  pedidos: any[] = [];
  cargando: boolean = false;

  constructor(
    private clienteService: ClienteService,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    const stored = localStorage.getItem('cliente');
    if (!stored) {
      this.router.navigate(['/auth']);
      return;
    }
    const c = JSON.parse(stored);
    this.cliente = c;
    this.inicial = c.Nombre ? c.Nombre.charAt(0).toUpperCase() : '?';
  }

  toggleEdit(): void {
    this.editMode = !this.editMode;
    if (this.editMode) {
      this.editData = {
        Nombre: this.cliente.Nombre || '',
        Apellido: this.cliente.Apellido || '',
        Correo: this.cliente.Correo || '',
        Telefono: this.cliente.Telefono || '',
        Direccion: this.cliente.Direccion || ''
      };
    }
  }

  guardarCambios(): void {
    if (!this.cliente.IdCliente) return;
    this.clienteService.updateCliente(this.cliente.IdCliente, this.editData).subscribe({
      next: () => {
        this.cliente = { ...this.cliente, ...this.editData };
        localStorage.setItem('cliente', JSON.stringify(this.cliente));
        this.editMode = false;
        alert('Perfil actualizado correctamente');
      },
      error: () => {
        alert('Error al actualizar el perfil');
      }
    });
  }

  verPedidos(): void {
    this.vista = 'pedidos';
    this.cargando = true;
    this.http.get<any[]>(environment.urlApiBase + 'pedido/cliente/' + this.cliente.IdCliente).subscribe({
      next: (r) => { this.pedidos = r; this.cargando = false; },
      error: () => { this.cargando = false; }
    });
  }

  formatPrice(price: number): string {
    return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }).format(price);
  }

  cerrarSesion(): void {
    localStorage.removeItem('cliente');
    localStorage.removeItem('carrito');
    this.router.navigate(['/home']);
  }
}
