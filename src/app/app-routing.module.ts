import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './vistas/home/home.component';
import { RopaComponent } from './vistas/ropa/ropa.component';
import { GorrasComponent } from './vistas/gorras/gorras.component';
import { AccesoriosComponent } from './vistas/accesorios/accesorios.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'ropa', component: RopaComponent },
  { path: 'gorras', component: GorrasComponent },
  { path: 'accesorios', component: AccesoriosComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
