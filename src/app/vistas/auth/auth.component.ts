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
    this.clienteService.getClientePorCorreo(this.loginData.correo).subscribe({
      next: (response: any) => {
        console.log('RESPUESTA LOGIN:', JSON.stringify(response));
        const arr = Array.isArray(response) ? response : [response];
        if (arr.length > 0) {
          const cliente = arr[0];
          if (cliente['Contrasena'] === this.loginData.contrasena) {
            localStorage.setItem('cliente', JSON.stringify(cliente));
            Swal.fire({
              title: 'Bienvenido',
              text: 'Hola ' + cliente['Nombre'] + '!',
              icon: 'success',
              timer: 2000,
              showConfirmButton: false
            });
            this.router.navigate(['/home']);
          } else {
            Swal.fire('Error', 'Correo o contrasena incorrectos', 'error');
          }
        } else {
          Swal.fire('Error', 'Correo o contrasena incorrectos', 'error');
        }
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
    this.clienteService.createCliente(this.registerData).subscribe({
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
      error: () => {
        Swal.fire('Error', 'No se pudo registrar. Intenta de nuevo.', 'error');
        this.isLoading = false;
      }
    });
  }
}