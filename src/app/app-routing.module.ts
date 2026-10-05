import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './vistas/home/home.component';
import { RopaComponent } from './vistas/ropa/ropa.component';
import { GorrasComponent } from './vistas/gorras/gorras.component';
import { AccesoriosComponent } from './vistas/accesorios/accesorios.component';
import { AuthComponent } from './vistas/auth/auth.component';
import { CarritoComponent } from './vistas/carrito/carrito.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'ropa', component: RopaComponent },
  { path: 'gorras', component: GorrasComponent },
  { path: 'accesorios', component: AccesoriosComponent },
  { path: 'auth', component: AuthComponent },
  { path: 'carrito', component: CarritoComponent },
  { path: 'product', loadChildren: () => import('./product/product.module').then(m => m.ProductModule) },
  { path: '**', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }