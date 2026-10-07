import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './vistas/home/home.component';
import { RopaComponent } from './vistas/ropa/ropa.component';
import { GorrasComponent } from './vistas/gorras/gorras.component';
import { AccesoriosComponent } from './vistas/accesorios/accesorios.component';
import { AuthComponent } from './vistas/auth/auth.component';
import { MiCuentaComponent } from './vistas/mi-cuenta/mi-cuenta.component';
import { BusquedaComponent } from "./vistas/busqueda/busqueda.component";
import { CarritoComponent } from './vistas/carrito/carrito.component';
import { CheckoutComponent } from './vistas/checkout/checkout.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'ropa', component: RopaComponent },
  { path: 'gorras', component: GorrasComponent },
  { path: 'accesorios', component: AccesoriosComponent },
  { path: 'auth', component: AuthComponent },
  { path: 'mi-cuenta', component: MiCuentaComponent },
  { path: 'busqueda', component: BusquedaComponent },
  { path: 'carrito', component: CarritoComponent },
  { path: 'checkout', component: CheckoutComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
