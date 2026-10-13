import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ClienteService } from '../../services/cliente.service';
import { Cliente } from '../../models/cliente';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {

  isLogin = true;
  isLoading = false;

  loginData = {
    correo: '',
    contrasena: ''
  };

  registerData: Cliente = {
    idCliente: 0,
    nombre: '',
    apellido: '',
    correo: '',
    contrasena: '',
    direccion: '',
    telefono: ''
  };

  constructor(
    private clienteService: ClienteService,
    private router: Router
  ) {}

  toggleMode(): void {
    this.isLogin = !this.isLogin;
  }

  login(): void {
    if (!this.loginData.correo || !this.loginData.contrasena) {
      Swal.fire('Error', 'Completa todos los campos', 'error');
      return;
    }
    this.isLoading = true;
    this.clienteService.login(this.loginData.correo, this.loginData.contrasena).subscribe({
      next: (cliente: any) => {
        localStorage.setItem('cliente', JSON.stringify(cliente));
        Swal.fire({
          title: 'Bienvenido',
          text: 'Hola ' + cliente['Nombre'] + '!',
          icon: 'success',
          timer: 2000,
          showConfirmButton: false
        });
        this.router.navigate(['/home']);
        this.isLoading = false;
      },
      error: () => {
        Swal.fire('Error', 'Correo o contrasena incorrectos', 'error');
        this.isLoading = false;
      }
    });
  }

  register(): void {
    if (!this.registerData.nombre || !this.registerData.apellido ||
        !this.registerData.correo || !this.registerData.contrasena) {
      Swal.fire('Error', 'Completa los campos obligatorios', 'error');
      return;
    }

    this.isLoading = true;
    this.clienteService.registrar(this.registerData).subscribe({
      next: () => {
        Swal.fire({
          title: 'Registro exitoso',
          text: 'Ya puedes iniciar sesion',
          icon: 'success',
          timer: 2000,
          showConfirmButton: false
        });
        this.isLogin = true;
        this.isLoading = false;
      },
      error: (e: any) => {
        Swal.fire('Error', (e && e.error && e.error.error) || 'No se pudo registrar. Intenta de nuevo.', 'error');
        this.isLoading = false;
      }
    });
  }
}