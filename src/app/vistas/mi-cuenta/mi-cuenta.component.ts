import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClienteService } from '../../services/cliente.service';

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

  constructor(
    private clienteService: ClienteService,
    private router: Router
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

  cerrarSesion(): void {
    localStorage.removeItem('cliente');
    localStorage.removeItem('carrito');
    this.router.navigate(['/home']);
  }
}
